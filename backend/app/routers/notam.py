import re, requests
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api", tags=["notam"])

@router.get("/notam/{icao}")
def get_notam(icao: str):
    icao = icao.upper().strip()
    if not re.match(r"^[A-Z]{4}$", icao): raise HTTPException(400, "Invalid ICAO code")
    official_url = f"https://notams.aim.faa.gov/notamSearch/nsapp.html#/results?searchType=0&designatorsForLocation={icao}"
    # Keep this endpoint stable: never show airport-info text as NOTAM.
    return {"icao": icao, "source": "official_required", "official_url": official_url, "notams": f"Automatic NOTAM retrieval is not reliable for {icao} from public unauthenticated sources.\n\nUse the official NOTAM search / official briefing source before flight.\n\nOfficial search: {official_url}"}
