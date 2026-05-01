from fastapi import APIRouter, Depends, Form, HTTPException
from ..auth import require_admin
from ..db import setting_get, setting_set
from ..config import APP_VERSION

router = APIRouter(prefix="/api", tags=["settings"])

@router.get("/version")
def version(): return {"version": APP_VERSION}

@router.get("/settings/atpl-ai")
def get_atpl_ai_settings():
    return {"url": setting_get("atpl_ai_url", "https://avioren-aviation-mvp.onrender.com/"), "active": setting_get("atpl_ai_active", "false").lower() == "true"}

@router.post("/settings/atpl-ai")
def update_atpl_ai_settings(url: str = Form(...), active: str = Form("false"), admin=Depends(require_admin)):
    clean_url = url.strip()
    if not (clean_url.startswith("https://") or clean_url.startswith("http://")):
        raise HTTPException(400, "URL must start with http:// or https://")
    is_active = str(active).lower() in ("true", "1", "yes", "on")
    setting_set("atpl_ai_url", clean_url); setting_set("atpl_ai_active", "true" if is_active else "false")
    return {"url": clean_url, "active": is_active}
