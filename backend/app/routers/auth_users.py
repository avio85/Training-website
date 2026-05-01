import uuid, datetime, sqlite3
from fastapi import APIRouter, Depends, Form, HTTPException
from ..db import db, pwd_context
from ..auth import make_token, require_admin

router = APIRouter(prefix="/api", tags=["auth"])

@router.post("/signup")
def signup(email: str = Form(...), password: str = Form(...)):
    conn = db()
    try:
        conn.execute("INSERT INTO users VALUES (?,?,?,?,?,?,?)", (str(uuid.uuid4()), email.lower().strip(), pwd_context.hash(password), "student", 0, "email", datetime.datetime.utcnow().isoformat()))
        conn.commit()
    except sqlite3.IntegrityError:
        raise HTTPException(400, "Email already exists")
    finally:
        conn.close()
    return {"ok": True, "message": "Account created. Waiting for admin approval."}

@router.post("/login")
def login(email: str = Form(...), password: str = Form(...)):
    conn = db(); user = conn.execute("SELECT * FROM users WHERE email=?", (email.lower().strip(),)).fetchone(); conn.close()
    if not user or not pwd_context.verify(password, user["password_hash"]):
        raise HTTPException(401, "Wrong email or password")
    return {"token": make_token(user), "role": user["role"], "approved": bool(user["approved"]), "email": user["email"]}

@router.get("/users")
def list_users(admin=Depends(require_admin)):
    conn = db(); rows = [dict(r) for r in conn.execute("SELECT id,email,role,approved,created_at FROM users ORDER BY created_at DESC").fetchall()]; conn.close()
    return rows

@router.post("/users/{user_id}/approve")
def approve_user(user_id: str, admin=Depends(require_admin)):
    conn = db(); conn.execute("UPDATE users SET approved=1 WHERE id=?", (user_id,)); conn.commit(); conn.close()
    return {"ok": True}
