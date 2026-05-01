import datetime, uuid, sqlite3
from fastapi import Depends, HTTPException, Request, Form
import jwt
from .config import JWT_SECRET
from .db import db, pwd_context

def make_token(user):
    payload = {"sub": user["id"], "email": user["email"], "role": user["role"], "approved": bool(user["approved"]), "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)}
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

def get_current_user(request: Request):
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(401, "Missing token")
    try:
        payload = jwt.decode(auth.split(" ", 1)[1], JWT_SECRET, algorithms=["HS256"])
    except Exception:
        raise HTTPException(401, "Invalid token")
    conn = db(); user = conn.execute("SELECT * FROM users WHERE id=?", (payload["sub"],)).fetchone(); conn.close()
    if not user: raise HTTPException(401, "User not found. Please log in again.")
    return user

def require_member(user=Depends(get_current_user)):
    if not user["approved"]: raise HTTPException(403, "User not approved yet")
    return user

def require_admin(user=Depends(get_current_user)):
    if user["role"] != "admin": raise HTTPException(403, "Admin only")
    return user
