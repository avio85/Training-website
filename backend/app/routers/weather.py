import re, math, datetime, requests
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api/weather", tags=["weather"])

AIRPORT_WEATHER = {
    "LHKA": ["LHKA", "LHBP", "LHPP", "LHKE"],
    "LHBP": ["LHBP"],
    "LHPP": ["LHPP", "LHBP"],
    "LHKE": ["LHKE", "LHBP", "LHPP"],
}
LHKA_LAT, LHKA_LON = 46.53, 18.98


def parse_metar_summary(raw_metar: str):
    if not raw_metar:
        return {"temperature":"N/A","pressure":"N/A","wind":"N/A","visibility":"N/A","clouds":"N/A"}
    first_line = raw_metar.strip().splitlines()[0]
    parts = first_line.split()
    temp = pressure = wind = visibility = "N/A"
    clouds = []
    for p in parts:
        if re.match(r"^\d{3}\d{2}(G\d{2})?KT$", p):
            wind = f"{p[0:3]}° / {int(p[3:5])} kt"
            gust = re.search(r"G(\d{2})KT", p)
            if gust:
                wind += f" gust {int(gust.group(1))} kt"
        elif re.match(r"^VRB\d{2}(G\d{2})?KT$", p):
            wind = f"VRB / {int(p[3:5])} kt"
        elif re.match(r"^Q\d{4}$", p):
            pressure = f"{int(p[1:])} hPa"
        elif re.match(r"^A\d{4}$", p):
            pressure = f"{round((int(p[1:]) / 100) * 33.8639)} hPa"
        elif re.match(r"^(M?\d{2})/(M?\d{2})$", p):
            temp = f"{int(p.split('/')[0].replace('M','-'))}°C"
        elif p == "CAVOK":
            visibility = "CAVOK"; clouds = ["CAVOK"]
        elif p == "9999":
            visibility = "10 km or more"
        elif re.match(r"^\d{4}$", p):
            visibility = f"{p} m"
        elif re.match(r"^(FEW|SCT|BKN|OVC)\d{3}", p):
            clouds.append(f"{p[:3]} {int(p[3:6])*100} ft")
    return {"temperature":temp,"pressure":pressure,"wind":wind,"visibility":visibility,"clouds":", ".join(clouds) if clouds else "N/A"}


def safe_get(url):
    try:
        r = requests.get(url, timeout=12, headers={"User-Agent":"AviOrenAviationTrainingPortal/2.2"})
        return r.text.strip() if r.status_code == 200 else ""
    except Exception:
        return ""


def open_meteo_lhka():
    """No-key fallback for dashboard only. This is not official aviation weather."""
    url = (
        "https://api.open-meteo.com/v1/forecast"
        "?latitude=46.53&longitude=18.98"
        "&current=temperature_2m,wind_speed_10m,wind_direction_10m,surface_pressure"
        "&timezone=Europe%2FBudapest"
    )
    try:
        r = requests.get(url, timeout=12, headers={"User-Agent":"AviOrenAviationTrainingPortal/2.2"})
        if r.status_code != 200:
            return None
        c = r.json().get("current", {})
        if not c:
            return None
        wind_kmh = c.get("wind_speed_10m")
        wind_kt = round(float(wind_kmh) / 1.852) if wind_kmh is not None else None
        direction = c.get("wind_direction_10m")
        return {
            "temperature": f"{round(float(c['temperature_2m']))}°C" if c.get("temperature_2m") is not None else "N/A",
            "pressure": f"{round(float(c['surface_pressure']))} hPa" if c.get("surface_pressure") is not None else "N/A",
            "wind": f"{round(float(direction)):03d}° / {wind_kt} kt" if direction is not None and wind_kt is not None else "N/A",
            "visibility": "N/A",
            "clouds": "N/A",
        }
    except Exception:
        return None


def sunrise_sunset_local(lat=LHKA_LAT, lon=LHKA_LON, date=None):
    date = date or datetime.date.today()
    zenith = 90.833
    def calc(is_rise):
        n = date.timetuple().tm_yday
        lng_hour = lon / 15
        t = n + ((6 if is_rise else 18) - lng_hour) / 24
        M = (0.9856 * t) - 3.289
        L = M + (1.916 * math.sin(math.radians(M))) + (0.020 * math.sin(math.radians(2*M))) + 282.634
        L %= 360
        RA = math.degrees(math.atan(0.91764 * math.tan(math.radians(L)))) % 360
        Lquadrant = (math.floor(L/90))*90
        RAquadrant = (math.floor(RA/90))*90
        RA = (RA + (Lquadrant - RAquadrant)) / 15
        sinDec = 0.39782 * math.sin(math.radians(L))
        cosDec = math.cos(math.asin(sinDec))
        cosH = (math.cos(math.radians(zenith)) - (sinDec * math.sin(math.radians(lat)))) / (cosDec * math.cos(math.radians(lat)))
        if cosH > 1 or cosH < -1:
            return "—"
        H = (360 - math.degrees(math.acos(cosH))) if is_rise else math.degrees(math.acos(cosH))
        H /= 15
        T = H + RA - (0.06571 * t) - 6.622
        UT = (T - lng_hour) % 24
        offset = 2 if 3 <= date.month <= 10 else 1
        local = (UT + offset) % 24
        h = int(local)
        m = int(round((local-h)*60))
        if m == 60:
            h = (h + 1) % 24; m = 0
        return f"{h:02d}:{m:02d}"
    return {"sunrise": calc(True), "sunset": calc(False)}


@router.get("/airport/{icao}")
def get_airport_weather(icao: str):
    icao = icao.upper().strip()
    if icao not in AIRPORT_WEATHER:
        raise HTTPException(404, "Airport not configured")

    ids = ",".join(AIRPORT_WEATHER[icao])
    metar = safe_get(f"https://aviationweather.gov/api/data/metar?ids={ids}&format=raw&taf=false")
    taf = safe_get(f"https://aviationweather.gov/api/data/taf?ids={ids}&format=raw")
    source_airport = icao
    used_fallback = False
    if metar:
        first = metar.split()[0]
        if len(first) == 4:
            source_airport = first
            used_fallback = first != icao

    summary = parse_metar_summary(metar)
    source_note = "aviationweather.gov METAR"

    if icao == "LHKA" and (not metar or all(summary.get(k) == "N/A" for k in ("temperature", "pressure", "wind"))):
        fallback = open_meteo_lhka()
        if fallback:
            summary.update({k: v for k, v in fallback.items() if v != "N/A"})
            source_note = "Open-Meteo fallback for LHKA dashboard"

    payload = {
        "icao": icao,
        "source_airport": source_airport,
        "used_fallback": used_fallback,
        "metar": metar,
        "taf": taf,
        "summary": summary,
        "source_note": source_note,
    }
    if icao == "LHKA":
        payload["sun"] = sunrise_sunset_local()
    return payload
