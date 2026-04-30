
import os, sqlite3, shutil, uuid, datetime, re
from typing import Optional
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from passlib.context import CryptContext
import jwt
import requests

APP_NAME = "Avi Oren Aviation"
JWT_SECRET = os.getenv("JWT_SECRET", "change-this-secret-before-production")
DB_PATH = os.getenv("DB_PATH", "avi_aviation.db")
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")

os.makedirs(UPLOAD_DIR, exist_ok=True)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI(title=APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = db()
    cur = conn.cursor()
    cur.execute("""CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'student',
        approved INTEGER NOT NULL DEFAULT 0,
        auth_provider TEXT NOT NULL DEFAULT 'email',
        created_at TEXT NOT NULL
    )""")
    cur.execute("""CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT,
        program TEXT NOT NULL,
        notes TEXT
    )""")
    cur.execute("""CREATE TABLE IF NOT EXISTS schedule (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        start_time TEXT NOT NULL,
        length_hours REAL NOT NULL,
        student TEXT NOT NULL,
        instructor TEXT NOT NULL,
        aircraft_type TEXT NOT NULL,
        aircraft_number TEXT NOT NULL,
        notes TEXT
    )""")
    cur.execute("""CREATE TABLE IF NOT EXISTS briefings (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        filename TEXT NOT NULL,
        original_name TEXT NOT NULL,
        uploaded_at TEXT NOT NULL
    )""")
    conn.commit()

    # default admin from env or demo
    admin_email = os.getenv("ADMIN_EMAIL", "admin@avioren.local").lower()
    admin_password = os.getenv("ADMIN_PASSWORD", "ChangeMe123!")
    cur.execute("SELECT id FROM users WHERE email=?", (admin_email,))
    if not cur.fetchone():
        cur.execute("INSERT INTO users VALUES (?,?,?,?,?,?,?)", (
            str(uuid.uuid4()), admin_email,
            pwd_context.hash(admin_password),
            "admin", 1, "email", datetime.datetime.utcnow().isoformat()
        ))
    # demo data
    cur.execute("SELECT COUNT(*) as c FROM students")
    if cur.fetchone()["c"] == 0:
        demo_students = [
            ("David Cohen","david@example.com","PPL(A)"),
            ("Noa Levi","noa@example.com","Hour Building"),
            ("Yossi Amir","yossi@example.com","Modular CPL(A)"),
            ("Maya Ben-David","maya@example.com","PPL(A)"),
            ("Eitan Katz","eitan@example.com","Hour Building"),
            ("Lior Shani","lior@example.com","Modular CPL(A)")
        ]
        for name,email,program in demo_students:
            cur.execute("INSERT INTO students VALUES (?,?,?,?,?)", (str(uuid.uuid4()), name, email, program, "Demo student"))
    cur.execute("SELECT COUNT(*) as c FROM schedule")
    if cur.fetchone()["c"] == 0:
        demo_schedule = [
            ("2026-05-05","08:00",1.0,"David Cohen","Avi Oren","C172","HA-101","Circuit training"),
            ("2026-05-05","09:30",1.5,"Noa Levi","Avi Oren","C172","HA-102","Navigation prep"),
            ("2026-05-05","12:00",2.0,"Yossi Amir","Avi Oren","C152","HA-201","Hour building"),
        ]
        for row in demo_schedule:
            cur.execute("INSERT INTO schedule VALUES (?,?,?,?,?,?,?,?,?)", (str(uuid.uuid4()), *row))
    conn.commit()
    conn.close()

init_db()

def make_token(user):
    payload = {
        "sub": user["id"],
        "email": user["email"],
        "role": user["role"],
        "approved": bool(user["approved"]),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

def get_current_user(request: Request):
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(401, "Missing token")
    try:
        payload = jwt.decode(auth.split(" ", 1)[1], JWT_SECRET, algorithms=["HS256"])
    except Exception:
        raise HTTPException(401, "Invalid token")
    conn = db()
    user = conn.execute("SELECT * FROM users WHERE id=?", (payload["sub"],)).fetchone()
    conn.close()
    if not user:
        raise HTTPException(401, "User not found")
    return user

def require_admin(user=Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(403, "Admin only")
    return user

def require_member(user=Depends(get_current_user)):
    if not user["approved"]:
        raise HTTPException(403, "User not approved yet")
    return user

@app.post("/api/signup")
def signup(email: str = Form(...), password: str = Form(...)):
    conn = db()
    try:
        conn.execute("INSERT INTO users VALUES (?,?,?,?,?,?,?)", (
            str(uuid.uuid4()), email.lower(), pwd_context.hash(password),
            "student", 0, "email", datetime.datetime.utcnow().isoformat()
        ))
        conn.commit()
    except sqlite3.IntegrityError:
        raise HTTPException(400, "Email already exists")
    finally:
        conn.close()
    return {"ok": True, "message": "Account created. Waiting for admin approval."}

@app.post("/api/login")
def login(email: str = Form(...), password: str = Form(...)):
    conn = db()
    user = conn.execute("SELECT * FROM users WHERE email=?", (email.lower(),)).fetchone()
    conn.close()
    if not user or not pwd_context.verify(password, user["password_hash"]):
        raise HTTPException(401, "Wrong email or password")
    return {"token": make_token(user), "role": user["role"], "approved": bool(user["approved"]), "email": user["email"]}

@app.get("/api/public/info")
def public_info():
    return {
        "project": APP_NAME,
        "public_pages": ["Airfield information", "Aircraft information", "Modular training information"],
        "home_airfield": "LHKA",
        "airfields": ["LHKA", "LHJK", "LHPP", "LHSM"],
        "aircraft": ["C152", "C172 Diesel / G1000"]
    }

@app.get("/api/schedule")
def list_schedule(user=Depends(require_member)):
    conn = db()
    rows = [dict(r) for r in conn.execute("SELECT * FROM schedule ORDER BY date,start_time").fetchall()]
    conn.close()
    return rows

@app.post("/api/schedule")
def add_schedule(date: str = Form(...), start_time: str = Form(...), length_hours: float = Form(...),
                 student: str = Form(...), instructor: str = Form("Avi Oren"),
                 aircraft_type: str = Form(...), aircraft_number: str = Form(...),
                 notes: str = Form(""), admin=Depends(require_admin)):
    if length_hours < 0.5 or length_hours > 4:
        raise HTTPException(400, "Length must be between 0.5 and 4 hours")
    if aircraft_type not in ["C152", "C172"]:
        raise HTTPException(400, "Aircraft type must be C152 or C172")
    conn = db()
    conn.execute("INSERT INTO schedule VALUES (?,?,?,?,?,?,?,?,?)", (
        str(uuid.uuid4()), date, start_time, length_hours, student, instructor, aircraft_type, aircraft_number, notes
    ))
    conn.commit()
    conn.close()
    return {"ok": True}

@app.get("/api/students")
def list_students(admin=Depends(require_admin)):
    conn = db()
    rows = [dict(r) for r in conn.execute("SELECT * FROM students ORDER BY name").fetchall()]
    conn.close()
    return rows

@app.post("/api/students")
def add_student(name: str = Form(...), email: str = Form(""), program: str = Form(...), notes: str = Form(""), admin=Depends(require_admin)):
    conn = db()
    conn.execute("INSERT INTO students VALUES (?,?,?,?,?)", (str(uuid.uuid4()), name, email, program, notes))
    conn.commit()
    conn.close()
    return {"ok": True}

@app.get("/api/users")
def list_users(admin=Depends(require_admin)):
    conn = db()
    rows = [dict(r) for r in conn.execute("SELECT id,email,role,approved,created_at FROM users ORDER BY created_at DESC").fetchall()]
    conn.close()
    return rows

@app.post("/api/users/{user_id}/approve")
def approve_user(user_id: str, admin=Depends(require_admin)):
    conn = db()
    conn.execute("UPDATE users SET approved=1 WHERE id=?", (user_id,))
    conn.commit()
    conn.close()
    return {"ok": True}

@app.post("/api/briefings")
def upload_briefing(title: str = Form(...), category: str = Form(...), file: UploadFile = File(...), admin=Depends(require_admin)):
    safe_name = f"{uuid.uuid4()}_{file.filename.replace('/', '_')}"
    path = os.path.join(UPLOAD_DIR, safe_name)
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    conn = db()
    conn.execute("INSERT INTO briefings VALUES (?,?,?,?,?,?)", (
        str(uuid.uuid4()), title, category, safe_name, file.filename, datetime.datetime.utcnow().isoformat()
    ))
    conn.commit()
    conn.close()
    return {"ok": True}

@app.get("/api/briefings")
def list_briefings(user=Depends(require_member)):
    conn = db()
    rows = [dict(r) for r in conn.execute("SELECT * FROM briefings ORDER BY uploaded_at DESC").fetchall()]
    conn.close()
    return rows


@app.get("/api/weather/aviation-met")
def aviation_met_connector(user=Depends(require_member)):
    """
    Secure server-side aviation.met.hu connector.

    Required Render environment variables:
    - AVIATION_MET_USERNAME
    - AVIATION_MET_PASSWORD

    Optional if the website login form needs adjustment:
    - AVIATION_MET_LOGIN_URL
    - AVIATION_MET_DATA_URL
    - AVIATION_MET_USER_FIELD
    - AVIATION_MET_PASS_FIELD
    """
    username = os.getenv("AVIATION_MET_USERNAME")
    password = os.getenv("AVIATION_MET_PASSWORD")
    login_url = os.getenv("AVIATION_MET_LOGIN_URL", "https://aviation.met.hu/en/login.php")
    data_url = os.getenv("AVIATION_MET_DATA_URL", "https://aviation.met.hu/en/taviratok/index.php")

    if not username or not password:
        raise HTTPException(400, "Missing AVIATION_MET_USERNAME or AVIATION_MET_PASSWORD in Render environment variables.")

    try:
        session = requests.Session()
        session.headers.update({
            "User-Agent": "AviOrenAviationTrainingPortal/1.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        })

        login_page = session.get(login_url, timeout=20)
        login_page.raise_for_status()

        payload = {}
        for name, value in re.findall(r'<input[^>]+type=["\\\']hidden["\\\'][^>]*name=["\\\']([^"\\\']+)["\\\'][^>]*value=["\\\']([^"\\\']*)["\\\']', login_page.text, re.I):
            payload[name] = value

        user_field = os.getenv("AVIATION_MET_USER_FIELD", "username")
        pass_field = os.getenv("AVIATION_MET_PASS_FIELD", "password")
        payload[user_field] = username
        payload[pass_field] = password

        auth = session.post(login_url, data=payload, timeout=20, allow_redirects=True)
        auth.raise_for_status()

        data = session.get(data_url, timeout=20)
        data.raise_for_status()

        text = re.sub(r"<script.*?</script>", "", data.text, flags=re.S | re.I)
        text = re.sub(r"<style.*?</style>", "", text, flags=re.S | re.I)
        text = re.sub(r"<[^>]+>", " ", text)
        text = re.sub(r"\\s+", " ", text).strip()

        if len(text) < 40:
            raise HTTPException(502, "Logged in but no readable aviation weather text was extracted.")

        return {"source": "aviation.met.hu", "data_url": data_url, "text": text[:12000]}

    except requests.HTTPError as e:
        raise HTTPException(502, f"Aviation.met.hu HTTP error: {str(e)}")
    except requests.RequestException as e:
        raise HTTPException(502, f"Aviation.met.hu connection error: {str(e)}")
    except Exception as e:
        raise HTTPException(500, f"Aviation.met.hu connector error: {str(e)}")


app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
