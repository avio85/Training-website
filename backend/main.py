
import os, sqlite3, shutil, uuid, datetime, re, json, math
from pathlib import Path
from typing import Optional
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Depends, Request, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from passlib.context import CryptContext
import jwt
import requests

APP_NAME = "Avi Oren Aviation"
JWT_SECRET = os.getenv("JWT_SECRET", "change-this-secret-before-production")
DB_PATH = os.getenv("DB_PATH", "avi_aviation.db")
BASE_DIR = Path(__file__).resolve().parents[1]
UPLOAD_DIR = os.getenv("UPLOAD_DIR", str(BASE_DIR / "backend" / "uploads"))
FRONTEND_DIR = os.getenv("FRONTEND_DIR", str(BASE_DIR / "frontend"))
DATABASE_URL = os.getenv("DATABASE_URL")
USE_POSTGRES = bool(DATABASE_URL)

os.makedirs(UPLOAD_DIR, exist_ok=True)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


DEFAULT_WAVE_SCHEDULE = [
  {
    "id": "f1",
    "date": "2026-05-03",
    "time": "0800",
    "aircraft": "C172",
    "student": "Nir K",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f2",
    "date": "2026-05-03",
    "time": "0800",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": "1h"
  },
  {
    "id": "f3",
    "date": "2026-05-03",
    "time": "1000",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f4",
    "date": "2026-05-03",
    "time": "1000",
    "aircraft": "C152",
    "student": "Aviad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f5",
    "date": "2026-05-03",
    "time": "1200",
    "aircraft": "C172",
    "student": "Nir D",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f6",
    "date": "2026-05-03",
    "time": "1200",
    "aircraft": "C152",
    "student": "Ofek",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f7",
    "date": "2026-05-03",
    "time": "1400",
    "aircraft": "C172",
    "student": "Nir K",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f8",
    "date": "2026-05-03",
    "time": "1400",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": "1h"
  },
  {
    "id": "f9",
    "date": "2026-05-03",
    "time": "1600",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": "1h"
  },
  {
    "id": "f10",
    "date": "2026-05-03",
    "time": "1600",
    "aircraft": "C152",
    "student": "Aviad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f11",
    "date": "2026-05-04",
    "time": "0800",
    "aircraft": "C172",
    "student": "Nir K",
    "instructor": "Avi",
    "note": "3h"
  },
  {
    "id": "f12",
    "date": "2026-05-04",
    "time": "0800",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": "1h"
  },
  {
    "id": "f13",
    "date": "2026-05-04",
    "time": "1000",
    "aircraft": "C152",
    "student": "Aviad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f14",
    "date": "2026-05-04",
    "time": "1200",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f15",
    "date": "2026-05-04",
    "time": "1200",
    "aircraft": "C152",
    "student": "Ofek",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f16",
    "date": "2026-05-04",
    "time": "1400",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": "1h"
  },
  {
    "id": "f17",
    "date": "2026-05-04",
    "time": "1400",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f18",
    "date": "2026-05-04",
    "time": "1600",
    "aircraft": "C172",
    "student": "Nir D",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f19",
    "date": "2026-05-04",
    "time": "1600",
    "aircraft": "C152",
    "student": "Aviad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f20",
    "date": "2026-05-05",
    "time": "0800",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f21",
    "date": "2026-05-05",
    "time": "0800",
    "aircraft": "C152",
    "student": "Aviad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f22",
    "date": "2026-05-05",
    "time": "1000",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": "1h"
  },
  {
    "id": "f23",
    "date": "2026-05-05",
    "time": "1000",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": "1h"
  },
  {
    "id": "f24",
    "date": "2026-05-05",
    "time": "1200",
    "aircraft": "C172",
    "student": "Nir K",
    "instructor": "Avi",
    "note": "3h"
  },
  {
    "id": "f25",
    "date": "2026-05-05",
    "time": "1200",
    "aircraft": "C152",
    "student": "Ofek",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f26",
    "date": "2026-05-05",
    "time": "1400",
    "aircraft": "C152",
    "student": "Aviad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f27",
    "date": "2026-05-05",
    "time": "1600",
    "aircraft": "C172",
    "student": "Nir D",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f28",
    "date": "2026-05-05",
    "time": "1600",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f29",
    "date": "2026-05-06",
    "time": "0800",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f30",
    "date": "2026-05-06",
    "time": "0800",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f31",
    "date": "2026-05-06",
    "time": "1000",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f32",
    "date": "2026-05-06",
    "time": "1000",
    "aircraft": "C152",
    "student": "Aviad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f33",
    "date": "2026-05-06",
    "time": "1200",
    "aircraft": "C172",
    "student": "Nir K",
    "instructor": "Avi",
    "note": "EXAM"
  },
  {
    "id": "f34",
    "date": "2026-05-06",
    "time": "1200",
    "aircraft": "C152",
    "student": "Ofek",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f35",
    "date": "2026-05-06",
    "time": "1400",
    "aircraft": "C172",
    "student": "Nir D",
    "instructor": "Avi",
    "note": "EXAM"
  },
  {
    "id": "f36",
    "date": "2026-05-06",
    "time": "1400",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f37",
    "date": "2026-05-06",
    "time": "1600",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f38",
    "date": "2026-05-06",
    "time": "1600",
    "aircraft": "C152",
    "student": "Aviad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f39",
    "date": "2026-05-07",
    "time": "0800",
    "aircraft": "C172",
    "student": "Aviad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f40",
    "date": "2026-05-07",
    "time": "0800",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f41",
    "date": "2026-05-07",
    "time": "1000",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f42",
    "date": "2026-05-07",
    "time": "1000",
    "aircraft": "C152",
    "student": "Ofek",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f43",
    "date": "2026-05-07",
    "time": "1200",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f44",
    "date": "2026-05-07",
    "time": "1200",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f45",
    "date": "2026-05-07",
    "time": "1400",
    "aircraft": "C172",
    "student": "Nir D",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f46",
    "date": "2026-05-07",
    "time": "1600",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f47",
    "date": "2026-05-08",
    "time": "0800",
    "aircraft": "C152",
    "student": "Ofek",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f48",
    "date": "2026-05-08",
    "time": "1000",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f49",
    "date": "2026-05-08",
    "time": "1200",
    "aircraft": "C172",
    "student": "Aviad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f50",
    "date": "2026-05-08",
    "time": "1400",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f51",
    "date": "2026-05-08",
    "time": "1600",
    "aircraft": "C172",
    "student": "Ofek",
    "instructor": "Avi",
    "note": "C172/C152"
  },
  {
    "id": "f52",
    "date": "2026-05-09",
    "time": "0800",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f53",
    "date": "2026-05-09",
    "time": "1000",
    "aircraft": "C172",
    "student": "Aviad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f54",
    "date": "2026-05-09",
    "time": "1200",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f55",
    "date": "2026-05-09",
    "time": "1400",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f56",
    "date": "2026-05-09",
    "time": "1600",
    "aircraft": "C172",
    "student": "Aviad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f57",
    "date": "2026-05-10",
    "time": "0800",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f58",
    "date": "2026-05-10",
    "time": "1000",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f59",
    "date": "2026-05-10",
    "time": "1200",
    "aircraft": "C172",
    "student": "Aviad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f60",
    "date": "2026-05-10",
    "time": "1400",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f61",
    "date": "2026-05-10",
    "time": "1600",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": ""
  }
]

app = FastAPI(title=APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DBIntegrityError = sqlite3.IntegrityError

if USE_POSTGRES:
    try:
        import psycopg2
        import psycopg2.extras
        DBIntegrityError = psycopg2.IntegrityError
    except Exception as e:
        raise RuntimeError("DATABASE_URL is set but psycopg2-binary is not installed or failed to import") from e

    def _translate_sql(sql: str) -> str:
        return sql.replace("?", "%s")

    class PgCursor:
        def __init__(self, cur):
            self.cur = cur
        def execute(self, sql, params=None):
            self.cur.execute(_translate_sql(sql), params or ())
            return self
        def fetchone(self):
            return self.cur.fetchone()
        def fetchall(self):
            return self.cur.fetchall()

    class PgConnection:
        def __init__(self):
            self.conn = psycopg2.connect(DATABASE_URL, cursor_factory=psycopg2.extras.RealDictCursor)
        def cursor(self):
            return PgCursor(self.conn.cursor())
        def execute(self, sql, params=None):
            cur = self.cursor()
            return cur.execute(sql, params or ())
        def commit(self):
            self.conn.commit()
        def rollback(self):
            self.conn.rollback()
        def close(self):
            self.conn.close()

    def db():
        return PgConnection()
else:
    def db():
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        return conn

def setting_put(conn, key, value):
    if USE_POSTGRES:
        conn.execute("INSERT INTO app_settings (key,value) VALUES (?,?) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value", (key, value))
    else:
        conn.execute("INSERT OR REPLACE INTO app_settings VALUES (?,?)", (key, value))

def setting_insert_default(conn, key, value):
    row = conn.execute("SELECT key FROM app_settings WHERE key=?", (key,)).fetchone()
    if not row:
        conn.execute("INSERT INTO app_settings VALUES (?,?)", (key, value))

def db_debug_status():
    info = {"database_url_exists": bool(DATABASE_URL), "postgres": USE_POSTGRES, "connected": False, "tables": []}
    try:
        conn = db()
        if USE_POSTGRES:
            rows = conn.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name").fetchall()
            info["tables"] = [r["table_name"] for r in rows]
        else:
            rows = conn.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").fetchall()
            info["tables"] = [r["name"] for r in rows]
        conn.close()
        info["connected"] = True
    except Exception as e:
        info["error"] = str(e)
    return info

def init_db():
    conn = db()
    cur = conn.cursor()
    if USE_POSTGRES:
        cur.execute("""CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'student',
            approved BOOLEAN NOT NULL DEFAULT FALSE,
            auth_provider TEXT NOT NULL DEFAULT 'email',
            created_at TEXT NOT NULL
        )""")
    else:
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
    cur.execute("""CREATE TABLE IF NOT EXISTS app_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
    )""")

    # Safe migrations for Supabase/Postgres and older temporary schemas.
    # These keep existing users while adding the fields used by the stable app.
    if USE_POSTGRES:
        for ddl in [
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'student'",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS approved BOOLEAN DEFAULT FALSE",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_provider TEXT DEFAULT 'email'",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at TEXT",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS full_name TEXT",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS license_info TEXT",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS notes TEXT"
        ]:
            try:
                cur.execute(ddl)
            except Exception:
                conn.rollback()
        try:
            cur.execute("UPDATE users SET password_hash=password WHERE password_hash IS NULL AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='password')")
        except Exception:
            conn.rollback()
        cur.execute("UPDATE users SET created_at=? WHERE created_at IS NULL", (datetime.datetime.utcnow().isoformat(),))
        cur.execute("UPDATE users SET auth_provider='email' WHERE auth_provider IS NULL")
        cur.execute("UPDATE users SET role='student' WHERE role IS NULL")
        cur.execute("UPDATE users SET approved=FALSE WHERE approved IS NULL")
    else:
        for col in [
            ("full_name", "TEXT"), ("phone", "TEXT"), ("license_info", "TEXT"), ("notes", "TEXT")
        ]:
            try: cur.execute(f"ALTER TABLE users ADD COLUMN {col[0]} {col[1]}")
            except Exception: pass

    setting_insert_default(conn, "atpl_ai_url", "https://avioren-aviation-mvp.onrender.com/")
    setting_insert_default(conn, "atpl_ai_active", "false")
    conn.commit()

    # default admin from env or demo
    admin_email = os.getenv("ADMIN_EMAIL", "admin@avioren.local").lower()
    admin_password = os.getenv("ADMIN_PASSWORD", "ChangeMe123!")
    admin_approved = True if USE_POSTGRES else 1
    admin_hash = pwd_context.hash(admin_password)
    cur.execute("SELECT id FROM users WHERE email=?", (admin_email,))
    existing_admin = cur.fetchone()
    if not existing_admin:
        cur.execute("INSERT INTO users (id,email,password_hash,role,approved,auth_provider,created_at) VALUES (?,?,?,?,?,?,?)", (
            str(uuid.uuid4()), admin_email,
            admin_hash,
            "admin", admin_approved, "email", datetime.datetime.utcnow().isoformat()
        ))
    else:
        # Keep Render ADMIN_EMAIL / ADMIN_PASSWORD authoritative after DB migration.
        cur.execute("UPDATE users SET password_hash=?, role=?, approved=?, auth_provider='email' WHERE email=?", (
            admin_hash, "admin", admin_approved, admin_email
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


@app.on_event("startup")
def startup_init_db():
    try:
        print("🚀 App starting...", flush=True)
        init_db()
        print("✅ DB initialized", flush=True)
    except Exception as e:
        print(f"❌ DB ERROR: {e}", flush=True)

@app.get("/api/debug/db")
def debug_db():
    info = db_debug_status()
    try:
        conn = db()
        rows = conn.execute("SELECT email, role, approved, created_at FROM users ORDER BY created_at DESC LIMIT 10").fetchall()
        info["users_preview"] = [dict(r) for r in rows]
        conn.close()
    except Exception as e:
        info["users_preview_error"] = str(e)
    return info

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
    if not user:
        email = payload.get("email", "").lower()
        admin_email = os.getenv("ADMIN_EMAIL", "admin@avioren.local").lower()
        if email == admin_email:
            try:
                conn.execute("INSERT INTO users (id,email,password_hash,role,approved,auth_provider,created_at) VALUES (?,?,?,?,?,?,?)", (
                    payload["sub"], admin_email,
                    pwd_context.hash(os.getenv("ADMIN_PASSWORD", "ChangeMe123!")),
                    "admin", True if USE_POSTGRES else 1, "email", datetime.datetime.utcnow().isoformat()
                ))
                conn.commit()
            except DBIntegrityError:
                conn.rollback()
            user = conn.execute("SELECT * FROM users WHERE id=?", (payload["sub"],)).fetchone()
        if not user:
            conn.close()
            raise HTTPException(401, "User not found. Please log out and log in again.")
    conn.close()
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
def signup(email: str = Form(...), password: str = Form(...), full_name: str = Form(""), phone: str = Form("")):
    conn = db()
    try:
        conn.execute("INSERT INTO users (id,email,password_hash,role,approved,auth_provider,created_at,full_name,phone) VALUES (?,?,?,?,?,?,?,?,?)", (
            str(uuid.uuid4()), email.lower().strip(), pwd_context.hash(password),
            "student", False if USE_POSTGRES else 0, "email", datetime.datetime.utcnow().isoformat(), full_name.strip(), phone.strip()
        ))
        conn.commit()
    except DBIntegrityError:
        conn.rollback()
        raise HTTPException(400, "Email already exists")
    except Exception as e:
        conn.rollback()
        raise HTTPException(500, f"Signup failed: {str(e)}")
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

@app.get("/api/me")
def get_me(user=Depends(require_member)):
    return {
        "email": user["email"],
        "role": user["role"],
        "approved": bool(user["approved"]),
        "created_at": user["created_at"] if "created_at" in user.keys() else "",
        "full_name": user["full_name"] if "full_name" in user.keys() else "",
        "phone": user["phone"] if "phone" in user.keys() else "",
        "license_info": user["license_info"] if "license_info" in user.keys() else "",
        "notes": user["notes"] if "notes" in user.keys() else ""
    }

@app.post("/api/me")
def update_me(full_name: str = Form(""), phone: str = Form(""), license_info: str = Form(""), notes: str = Form(""), user=Depends(require_member)):
    conn = db()
    conn.execute("UPDATE users SET full_name=?, phone=?, license_info=?, notes=? WHERE id=?", (
        full_name.strip(), phone.strip(), license_info.strip(), notes.strip(), user["id"]
    ))
    conn.commit()
    conn.close()
    return {"ok": True}

@app.get("/debug/db")
def debug_db_shortcut():
    return debug_db()

@app.get("/api/debug/db/")
def debug_db_trailing():
    return debug_db()

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
    conn.execute("UPDATE users SET approved=? WHERE id=?", (True if USE_POSTGRES else 1, user_id))
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



@app.get("/api/weather/connector-status")
def aviation_met_connector_status(user=Depends(require_member)):
    return {
        "has_username": bool(os.getenv("AVIATION_MET_USERNAME")),
        "has_password": bool(os.getenv("AVIATION_MET_PASSWORD")),
        "login_url": os.getenv("AVIATION_MET_LOGIN_URL", "https://aviation.met.hu/en/login.php"),
        "data_url": os.getenv("AVIATION_MET_DATA_URL", "https://aviation.met.hu/en/taviratok/index.php?friss=18:11:10"),
        "user_field": os.getenv("AVIATION_MET_USER_FIELD", "username"),
        "pass_field": os.getenv("AVIATION_MET_PASS_FIELD", "password")
    }

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
    data_url = os.getenv("AVIATION_MET_DATA_URL", "https://aviation.met.hu/en/taviratok/index.php?friss=18:11:10")

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



@app.get("/api/settings/atpl-ai")
def get_atpl_ai_settings():
    conn = db()
    rows = conn.execute("SELECT key,value FROM app_settings WHERE key IN ('atpl_ai_url','atpl_ai_active')").fetchall()
    conn.close()
    settings = {r["key"]: r["value"] for r in rows}
    return {
        "url": settings.get("atpl_ai_url", "https://avioren-aviation-mvp.onrender.com/"),
        "active": settings.get("atpl_ai_active", "false").lower() == "true"
    }

@app.post("/api/settings/atpl-ai")
async def update_atpl_ai_settings(request: Request, admin=Depends(require_admin)):
    # Accept both JSON and FormData so the admin panel does not fail if the browser sends either.
    content_type = request.headers.get("content-type", "").lower()
    if "application/json" in content_type:
        data = await request.json()
        clean_url = str(data.get("url", "")).strip()
        is_active = bool(data.get("active", False))
    else:
        form = await request.form()
        clean_url = str(form.get("url", "")).strip()
        is_active = str(form.get("active", "false")).lower() in ("true", "1", "yes", "on")
    if not clean_url:
        clean_url = "https://avioren-aviation-mvp.onrender.com/"
    if not (clean_url.startswith("https://") or clean_url.startswith("http://")):
        raise HTTPException(400, "URL must start with http:// or https://")
    conn = db()
    setting_put(conn, "atpl_ai_url", clean_url)
    setting_put(conn, "atpl_ai_active", "true" if is_active else "false")
    conn.commit()
    conn.close()
    return {"url": clean_url, "active": is_active}


def _sun_time_utc(day, latitude, longitude, is_sunrise=True):
    # NOAA-style approximation, sufficient for dashboard planning only.
    zenith = 90.833
    n = day.timetuple().tm_yday
    lng_hour = longitude / 15.0
    t = n + ((6 - lng_hour) / 24 if is_sunrise else (18 - lng_hour) / 24)
    m = (0.9856 * t) - 3.289
    l = m + (1.916 * math.sin(math.radians(m))) + (0.020 * math.sin(math.radians(2*m))) + 282.634
    l = l % 360
    ra = math.degrees(math.atan(0.91764 * math.tan(math.radians(l)))) % 360
    l_quadrant = (math.floor(l/90)) * 90
    ra_quadrant = (math.floor(ra/90)) * 90
    ra = (ra + l_quadrant - ra_quadrant) / 15
    sin_dec = 0.39782 * math.sin(math.radians(l))
    cos_dec = math.cos(math.asin(sin_dec))
    cos_h = (math.cos(math.radians(zenith)) - (sin_dec * math.sin(math.radians(latitude)))) / (cos_dec * math.cos(math.radians(latitude)))
    if cos_h > 1 or cos_h < -1:
        return None
    h = 360 - math.degrees(math.acos(cos_h)) if is_sunrise else math.degrees(math.acos(cos_h))
    h = h / 15
    local_mean_time = h + ra - (0.06571 * t) - 6.622
    return (local_mean_time - lng_hour) % 24

@app.get("/api/sun/LHKA")
def get_lhka_sun_times():
    # LHKA approx position: Kalocsa Airfield, Hungary. Output is Europe/Budapest local time.
    today = datetime.datetime.utcnow().date()
    lat, lon = 46.549, 18.942
    sunrise_utc = _sun_time_utc(today, lat, lon, True)
    sunset_utc = _sun_time_utc(today, lat, lon, False)
    # Hungary local time: CET/CEST. Simple DST: last Sunday Mar to last Sunday Oct.
    def last_sunday(year, month):
        d = datetime.date(year, month + 1, 1) - datetime.timedelta(days=1) if month < 12 else datetime.date(year, 12, 31)
        while d.weekday() != 6:
            d -= datetime.timedelta(days=1)
        return d
    offset = 2 if last_sunday(today.year,3) <= today < last_sunday(today.year,10) else 1
    def fmt(hours):
        if hours is None:
            return "—"
        h = int((hours + offset) % 24)
        m = int(round((((hours + offset) % 24) - h) * 60))
        if m == 60:
            h = (h + 1) % 24; m = 0
        return f"{h:02d}:{m:02d}"
    return {"icao":"LHKA", "sunrise":fmt(sunrise_utc), "sunset":fmt(sunset_utc), "timezone":"Europe/Budapest"}




def parse_metar_summary(raw_metar: str):
    if not raw_metar:
        return {"temperature": "N/A", "pressure": "N/A", "wind": "N/A", "visibility": "N/A", "clouds": "N/A"}
    first_line = raw_metar.strip().splitlines()[0]
    parts = first_line.split()
    temp = pressure = wind = visibility = "N/A"
    clouds = []
    for p in parts:
        if re.match(r"^\d{3}\d{2}(G\d{2})?KT$", p):
            wind = f"{p[0:3]}° / {int(p[3:5])} kt"
            gust = re.search(r"G(\d{2})KT", p)
            if gust:
                wind += f" gust {int(gust.group(1))} kt"
        elif re.match(r"^VRB\d{2}(G\d{2})?KT$", p):
            wind = f"VRB / {int(p[3:5])} kt"
        elif re.match(r"^Q\d{4}$", p):
            pressure = f"{int(p[1:])} mb"
        elif re.match(r"^A\d{4}$", p):
            pressure = f"{round((int(p[1:]) / 100) * 33.8639)} mb"
        elif re.match(r"^(M?\d{2})/(M?\d{2})$", p):
            temp = f"{int(p.split('/')[0].replace('M','-'))}°C"
        elif p == "CAVOK":
            visibility = "CAVOK"; clouds = ["CAVOK"]
        elif p == "9999":
            visibility = "10 km or more"
        elif re.match(r"^\d{4}$", p):
            visibility = f"{p} m"
        elif re.match(r"^(FEW|SCT|BKN|OVC)\d{3}", p):
            clouds.append(f"{p[:3]} {int(p[3:6])*100} ft")
    return {"temperature": temp, "pressure": pressure, "wind": wind, "visibility": visibility, "clouds": ", ".join(clouds) if clouds else "N/A"}

AIRPORT_WEATHER = {
    "LHKA": {"ids": ["LHKA", "LHBP", "LHPP", "LHKE"]},
    "LHBP": {"ids": ["LHBP"]},
    "LHPP": {"ids": ["LHPP", "LHBP"]},
    "LHKE": {"ids": ["LHKE", "LHBP", "LHPP"]},
}

@app.get("/api/weather/airport/{icao}")
def get_airport_weather(icao: str):
    icao = icao.upper().strip()
    if icao not in AIRPORT_WEATHER:
        raise HTTPException(404, "Airport not configured")
    ids = ",".join(AIRPORT_WEATHER[icao]["ids"])
    def safe_get(url):
        try:
            r = requests.get(url, timeout=15, headers={"User-Agent": "AviOrenAviationTrainingPortal/1.0"})
            if r.status_code == 200:
                return r.text.strip()
        except Exception:
            return ""
        return ""
    metar = safe_get(f"https://aviationweather.gov/api/data/metar?ids={ids}&format=raw&taf=false")
    taf = safe_get(f"https://aviationweather.gov/api/data/taf?ids={ids}&format=raw")
    source_airport = icao
    used_fallback = False
    if metar:
        first = metar.split()[0]
        if len(first) == 4:
            source_airport = first
            used_fallback = first != icao
    return {"icao": icao, "source_airport": source_airport, "used_fallback": used_fallback, "metar": metar, "taf": taf, "summary": parse_metar_summary(metar)}


@app.get("/api/notam/{icao}")
def get_notam(icao: str):
    icao = icao.upper().strip()
    if not re.match(r"^[A-Z]{4}$", icao):
        raise HTTPException(400, "Invalid ICAO code")
    official_url = f"https://notams.aim.faa.gov/notamSearch/nsapp.html#/results?searchType=0&designatorsForLocation={icao}"
    sources = [f"https://metar-taf.com/notam/{icao}", f"https://metar-taf.com/metar/{icao}", f"https://metar.cloud/airport/{icao}"]
    for url in sources:
        try:
            r = requests.get(url, timeout=20, headers={"User-Agent": "Mozilla/5.0 AviOrenAviationTrainingPortal/1.0"})
            if r.status_code != 200 or not r.text:
                continue
            text = re.sub(r"<script.*?</script>", " ", r.text, flags=re.S | re.I)
            text = re.sub(r"<style.*?</style>", " ", text, flags=re.S | re.I)
            text = re.sub(r"<[^>]+>", " ", text)
            text = re.sub(r"&nbsp;|&#160;", " ", text)
            text = re.sub(r"\s+", " ", text).strip()
            upper = text.upper()
            if "NOTAM" in upper and len(text) > 120:
                idx = upper.find("NOTAM")
                return {"icao": icao, "source": url, "official_url": official_url, "notams": text[max(0, idx-300):idx+9000][:12000]}
        except Exception:
            pass
    return {"icao": icao, "source": "manual", "official_url": official_url, "notams": f"Automatic NOTAM retrieval is not available for {icao} from the free public sources.\n\nOpen the official NOTAM search link and verify through an official briefing source before flight."}

@app.get("/api/wave-schedule")
def get_wave_schedule(user=Depends(require_member)):
    conn = db()
    row = conn.execute("SELECT value FROM app_settings WHERE key=?", ("wave_schedule",)).fetchone()
    conn.close()
    if row:
        try:
            flights = json.loads(row["value"])
            if isinstance(flights, list) and len(flights) > 0:
                return {"flights": flights}
        except Exception:
            pass
    return {"flights": DEFAULT_WAVE_SCHEDULE}

@app.post("/api/wave-schedule")
def update_wave_schedule(payload: dict = Body(...), admin=Depends(require_admin)):
    flights = payload.get("flights")
    if not isinstance(flights, list):
        raise HTTPException(400, "Invalid schedule payload")
    allowed_dates = {f"2026-05-{day:02d}" for day in range(3, 11)}
    allowed_times = {"0800", "1000", "1200", "1400", "1600"}
    allowed_aircraft = {"C172", "C152"}
    for flight in flights:
        if flight.get("date") not in allowed_dates:
            raise HTTPException(400, "Schedule is limited to May 3-10")
        if flight.get("time") not in allowed_times:
            raise HTTPException(400, "Invalid time slot")
        if flight.get("aircraft") not in allowed_aircraft:
            raise HTTPException(400, "Invalid aircraft")
    conn = db()
    setting_put(conn, "wave_schedule", json.dumps(flights))
    conn.commit()
    conn.close()
    return {"ok": True, "flights": flights}


app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")
