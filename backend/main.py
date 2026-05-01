import os
from fastapi import FastAPI
import psycopg2

app = FastAPI()


def get_conn():
    return psycopg2.connect(os.getenv("DATABASE_URL"))


def init_db():
    try:
        conn = get_conn()
        cur = conn.cursor()

        cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email TEXT UNIQUE,
            password TEXT,
            role TEXT DEFAULT 'member',
            approved BOOLEAN DEFAULT FALSE
        )
        """)

        cur.execute("""
        CREATE TABLE IF NOT EXISTS app_settings (
            key TEXT PRIMARY KEY,
            value TEXT
        )
        """)

        conn.commit()
        conn.close()

        print("✅ DB initialized")

    except Exception as e:
        print("❌ DB ERROR:", e)


@app.on_event("startup")
def startup():
    print("🚀 App starting...")
    init_db()


@app.get("/")
def root():
    return {"status": "ok"}


@app.get("/api/debug/db")
def debug_db():
    try:
        conn = get_conn()
        cur = conn.cursor()

        cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
        tables = cur.fetchall()

        conn.close()

        return {
            "connected": True,
            "tables": tables
        }

    except Exception as e:
        return {
            "connected": False,
            "error": str(e)
        }
