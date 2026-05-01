import os
from fastapi import FastAPI, HTTPException, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import psycopg2
from passlib.hash import bcrypt

app = FastAPI()

# ---------- DB ----------

def get_conn():
    return psycopg2.connect(os.getenv("DATABASE_URL"))

def init_db():
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'member',
        approved BOOLEAN DEFAULT TRUE
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS app_settings (
        key TEXT PRIMARY KEY,
        value TEXT
    )
    """)

    # create default admin
    admin_email = os.getenv("ADMIN_EMAIL", "admin@admin.com")
    admin_password = os.getenv("ADMIN_PASSWORD", "admin123")

    cur.execute("SELECT * FROM users WHERE email=%s", (admin_email,))
    if not cur.fetchone():
        cur.execute(
            "INSERT INTO users (email, password, role, approved) VALUES (%s,%s,%s,%s)",
            (admin_email, bcrypt.hash(admin_password), "admin", True)
        )

    conn.commit()
    conn.close()

@app.on_event("startup")
def startup():
    print("🚀 App starting...")
    init_db()


# ---------- AUTH ----------

@app.post("/api/signup")
def signup(email: str = Form(...), password: str = Form(...)):
    conn = get_conn()
    cur = conn.cursor()

    try:
        cur.execute(
            "INSERT INTO users (email, password) VALUES (%s,%s)",
            (email, bcrypt.hash(password))
        )
        conn.commit()
    except:
        raise HTTPException(400, "User exists")

    conn.close()
    return {"ok": True}


@app.post("/api/login")
def login(email: str = Form(...), password: str = Form(...)):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("SELECT password FROM users WHERE email=%s", (email,))
    row = cur.fetchone()

    conn.close()

    if not row or not bcrypt.verify(password, row[0]):
        raise HTTPException(401, "Invalid credentials")

    return {"ok": True}


# ---------- DEBUG ----------

@app.get("/api/debug/db")
def debug_db():
    try:
        conn = get_conn()
        cur = conn.cursor()

        cur.execute("SELECT email, role FROM users")
        users = cur.fetchall()

        conn.close()

        return {"connected": True, "users": users}

    except Exception as e:
        return {"connected": False, "error": str(e)}


# ---------- FRONTEND ----------

app.mount("/assets", StaticFiles(directory="frontend/assets"), name="assets")

@app.get("/")
def root():
    return FileResponse("frontend/index.html")
