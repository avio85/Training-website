import uuid, datetime, shutil
from fastapi import APIRouter, Depends, Form, UploadFile, File
from fastapi.staticfiles import StaticFiles
from ..auth import require_admin, require_member
from ..db import db
from ..config import UPLOAD_DIR

router = APIRouter(prefix="/api", tags=["admin-data"])

@router.get("/public/info")
def public_info():
    return {"project":"Avi Oren Aviation","home_airfield":"LHKA","airfields":["LHKA","LHJK","LHPP","LHSM"],"aircraft":["C152","C172 Diesel / G1000"]}

@router.get("/students")
def list_students(admin=Depends(require_admin)):
    conn = db(); rows = [dict(r) for r in conn.execute("SELECT * FROM students ORDER BY name").fetchall()]; conn.close(); return rows

@router.post("/students")
def add_student(name: str = Form(...), email: str = Form(""), program: str = Form(...), notes: str = Form(""), admin=Depends(require_admin)):
    conn = db(); conn.execute("INSERT INTO students VALUES (?,?,?,?,?)", (str(uuid.uuid4()), name, email, program, notes)); conn.commit(); conn.close(); return {"ok": True}

@router.post("/briefings")
def upload_briefing(title: str = Form(...), category: str = Form(...), file: UploadFile = File(...), admin=Depends(require_admin)):
    safe_name = f"{uuid.uuid4()}_{file.filename.replace('/', '_')}"; path = UPLOAD_DIR / safe_name
    with open(path, "wb") as buffer: shutil.copyfileobj(file.file, buffer)
    conn = db(); conn.execute("INSERT INTO briefings VALUES (?,?,?,?,?,?)", (str(uuid.uuid4()), title, category, safe_name, file.filename, datetime.datetime.utcnow().isoformat())); conn.commit(); conn.close(); return {"ok": True}

@router.get("/briefings")
def list_briefings(user=Depends(require_member)):
    conn = db(); rows = [dict(r) for r in conn.execute("SELECT * FROM briefings ORDER BY uploaded_at DESC").fetchall()]; conn.close(); return rows
