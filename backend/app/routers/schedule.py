import json
from pathlib import Path
from fastapi import APIRouter, Depends, Body, HTTPException
from ..auth import require_member, require_admin
from ..db import setting_get, setting_set

router = APIRouter(prefix="/api", tags=["schedule"])
DEFAULT_WAVE_SCHEDULE = json.loads((Path(__file__).resolve().parents[1] / "default_schedule.json").read_text())
ALLOWED_DATES = {f"2026-05-{day:02d}" for day in range(3, 11)}
ALLOWED_TIMES = {"0800", "1000", "1200", "1400", "1600"}
ALLOWED_AIRCRAFT = {"C172", "C152"}

@router.get("/wave-schedule")
def get_wave_schedule(user=Depends(require_member)):
    raw = setting_get("wave_schedule")
    if raw:
        try:
            flights = json.loads(raw)
            if isinstance(flights, list) and len(flights) > 0:
                return {"flights": flights, "source": "saved"}
        except Exception:
            pass
    return {"flights": DEFAULT_WAVE_SCHEDULE, "source": "default"}

@router.post("/wave-schedule")
def update_wave_schedule(payload: dict = Body(...), admin=Depends(require_admin)):
    flights = payload.get("flights")
    if not isinstance(flights, list): raise HTTPException(400, "Invalid schedule payload")
    for flight in flights:
        if flight.get("date") not in ALLOWED_DATES: raise HTTPException(400, "Schedule is limited to May 3-10")
        if flight.get("time") not in ALLOWED_TIMES: raise HTTPException(400, "Invalid time slot")
        if flight.get("aircraft") not in ALLOWED_AIRCRAFT: raise HTTPException(400, "Invalid aircraft")
    setting_set("wave_schedule", json.dumps(flights))
    return {"ok": True, "flights": flights}

@router.post("/wave-schedule/reset")
def reset_wave_schedule(admin=Depends(require_admin)):
    setting_set("wave_schedule", json.dumps(DEFAULT_WAVE_SCHEDULE))
    return {"ok": True, "flights": DEFAULT_WAVE_SCHEDULE}
