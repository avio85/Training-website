import sqlite3, uuid, datetime, os
from .config import DB_PATH, UPLOAD_DIR

try:
    from passlib.context import CryptContext
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
except Exception:
    import hashlib, hmac
    class _FallbackPwdContext:
        def hash(self, password):
            return "sha256$" + hashlib.sha256(password.encode("utf-8")).hexdigest()
        def verify(self, password, hashed):
            if not str(hashed).startswith("sha256$"):
                return False
            return hmac.compare_digest(self.hash(password), hashed)
    pwd_context = _FallbackPwdContext()

def db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def setting_get(key, default=None):
    conn = db(); row = conn.execute("SELECT value FROM app_settings WHERE key=?", (key,)).fetchone(); conn.close()
    return row["value"] if row else default

def setting_set(key, value):
    conn = db(); conn.execute("INSERT OR REPLACE INTO app_settings VALUES (?,?)", (key, str(value))); conn.commit(); conn.close()

def init_db():
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    conn = db(); cur = conn.cursor()
    cur.execute("""CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY,email TEXT UNIQUE NOT NULL,password_hash TEXT NOT NULL,role TEXT NOT NULL DEFAULT 'student',approved INTEGER NOT NULL DEFAULT 0,auth_provider TEXT NOT NULL DEFAULT 'email',created_at TEXT NOT NULL)""")
    cur.execute("""CREATE TABLE IF NOT EXISTS students (id TEXT PRIMARY KEY,name TEXT NOT NULL,email TEXT,program TEXT NOT NULL,notes TEXT)""")
    cur.execute("""CREATE TABLE IF NOT EXISTS schedule (id TEXT PRIMARY KEY,date TEXT NOT NULL,start_time TEXT NOT NULL,length_hours REAL NOT NULL,student TEXT NOT NULL,instructor TEXT NOT NULL,aircraft_type TEXT NOT NULL,aircraft_number TEXT NOT NULL,notes TEXT)""")
    cur.execute("""CREATE TABLE IF NOT EXISTS briefings (id TEXT PRIMARY KEY,title TEXT NOT NULL,category TEXT NOT NULL,filename TEXT NOT NULL,original_name TEXT NOT NULL,uploaded_at TEXT NOT NULL)""")
    cur.execute("""CREATE TABLE IF NOT EXISTS app_settings (key TEXT PRIMARY KEY,value TEXT NOT NULL)""")
    cur.execute("INSERT OR IGNORE INTO app_settings VALUES (?,?)", ("atpl_ai_url", "https://avioren-aviation-mvp.onrender.com/"))
    cur.execute("INSERT OR IGNORE INTO app_settings VALUES (?,?)", ("atpl_ai_active", "false"))
    admin_email = os.getenv("ADMIN_EMAIL", "admin@avioren.local").lower()
    admin_password = os.getenv("ADMIN_PASSWORD", "ChangeMe123!")
    if not cur.execute("SELECT id FROM users WHERE email=?", (admin_email,)).fetchone():
        cur.execute("INSERT INTO users VALUES (?,?,?,?,?,?,?)", (str(uuid.uuid4()), admin_email, pwd_context.hash(admin_password), "admin", 1, "email", datetime.datetime.utcnow().isoformat()))
    conn.commit(); conn.close()
