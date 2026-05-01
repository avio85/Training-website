import os, uuid, datetime, sqlite3
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

DATABASE_URL = os.getenv("DATABASE_URL") or os.getenv("SUPABASE_DB_URL") or os.getenv("SUPABASE_DATABASE_URL")
USE_POSTGRES = bool(DATABASE_URL)

DBIntegrityError = sqlite3.IntegrityError

if USE_POSTGRES:
    try:
        import psycopg2
        import psycopg2.extras
        DBIntegrityError = psycopg2.IntegrityError
    except Exception as e:
        raise RuntimeError(
            "DATABASE_URL/SUPABASE_DB_URL is set, but psycopg2 is not installed. "
            "Add psycopg2-binary to requirements.txt."
        ) from e

    def _translate_sql(sql: str) -> str:
        # The app was originally written with sqlite '?' placeholders.
        # This keeps all routers compatible with PostgreSQL.
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


def setting_get(key, default=None):
    conn = db()
    try:
        row = conn.execute("SELECT value FROM app_settings WHERE key=?", (key,)).fetchone()
        return row["value"] if row else default
    finally:
        conn.close()


def setting_set(key, value):
    conn = db()
    try:
        if USE_POSTGRES:
            conn.execute(
                "INSERT INTO app_settings (key,value) VALUES (?,?) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value",
                (key, str(value)),
            )
        else:
            conn.execute("INSERT OR REPLACE INTO app_settings VALUES (?,?)", (key, str(value)))
        conn.commit()
    finally:
        conn.close()


def _insert_setting_if_missing(cur, key, value):
    if USE_POSTGRES:
        cur.execute("INSERT INTO app_settings (key,value) VALUES (?,?) ON CONFLICT (key) DO NOTHING", (key, value))
    else:
        cur.execute("INSERT OR IGNORE INTO app_settings VALUES (?,?)", (key, value))


def init_db():
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
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
    cur.execute("""CREATE TABLE IF NOT EXISTS app_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
    )""")

    _insert_setting_if_missing(cur, "atpl_ai_url", "https://avioren-aviation-mvp.onrender.com/")
    _insert_setting_if_missing(cur, "atpl_ai_active", "false")

    admin_email = os.getenv("ADMIN_EMAIL", "admin@avioren.local").lower()
    admin_password = os.getenv("ADMIN_PASSWORD", "ChangeMe123!")
    if not cur.execute("SELECT id FROM users WHERE email=?", (admin_email,)).fetchone():
        cur.execute(
            "INSERT INTO users VALUES (?,?,?,?,?,?,?)",
            (str(uuid.uuid4()), admin_email, pwd_context.hash(admin_password), "admin", 1, "email", datetime.datetime.utcnow().isoformat()),
        )
    conn.commit()
    conn.close()

# Safe diagnostic endpoint helper for 0.2.4
# Defined at end so imports stay simple.
def db_status():
    status = {
        "database_url_present": bool(DATABASE_URL),
        "backend": "postgres" if USE_POSTGRES else "sqlite",
        "ok": False,
        "tables": [],
        "error": None,
    }
    try:
        conn = db()
        cur = conn.cursor()
        if USE_POSTGRES:
            cur.execute("SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename")
            rows = cur.fetchall()
            status["tables"] = [r["tablename"] for r in rows]
        else:
            cur.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
            rows = cur.fetchall()
            status["tables"] = [r["name"] for r in rows]
        conn.close()
        status["ok"] = True
    except Exception as e:
        status["error"] = str(e)
    return status
