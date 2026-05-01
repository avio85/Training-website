from fastapi import APIRouter, Depends, Form, HTTPException, Request
from ..auth import require_admin
from ..db import setting_get, setting_set
from ..config import APP_VERSION

router = APIRouter(prefix="/api", tags=["settings"])

@router.get("/version")
def version():
    return {"version": APP_VERSION}

@router.get("/settings/atpl-ai")
def get_atpl_ai_settings():
    return {
        "url": setting_get("atpl_ai_url", "https://avioren-aviation-mvp.onrender.com/"),
        "active": setting_get("atpl_ai_active", "false").lower() == "true",
    }

@router.post("/settings/atpl-ai")
async def update_atpl_ai_settings(
    request: Request,
    url: str = Form(None),
    active: str = Form(None),
    admin=Depends(require_admin),
):
    """Persist ATPL AI settings. Accepts both FormData and JSON for compatibility."""
    if url is None:
        try:
            payload = await request.json()
        except Exception:
            payload = {}
        url = payload.get("url")
        active = payload.get("active", active)

    clean_url = str(url or "").strip()
    if not (clean_url.startswith("https://") or clean_url.startswith("http://")):
        raise HTTPException(400, "URL must start with http:// or https://")

    is_active = str(active).lower() in ("true", "1", "yes", "on")
    setting_set("atpl_ai_url", clean_url)
    setting_set("atpl_ai_active", "true" if is_active else "false")
    return {"url": clean_url, "active": is_active}
