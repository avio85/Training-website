# Patch 0.1.15 — only files to update/add

Replace:
- `frontend/index.html`
- `frontend/style.css`
- `frontend/script.js`
- `backend/main.py`

Add:
- `frontend/assets/images/atpl_ai_arriving_soon.png`

No requirements.txt change.

Fixes:
- Weather page no longer has Google Maps button.
- Weather now uses backend proxy `/api/weather/airport/{icao}` instead of browser direct CORS requests.
- General weather summary is provided from Open-Meteo via backend.
- ATPL AI button works:
  - Active = opens configured URL in new tab.
  - Inactive = shows Arriving Soon page with the screenshot.
- Admin ATPL URL defaults to `https://avioren-aviation-mvp.onrender.com/`.
- Toggle control styled as a real switch.
- Schedule menu is visible after login and hidden for guests.
- Version updated to 0.1.15.

After upload:
1. Commit.
2. Render → Manual Deploy → Clear build cache & deploy.
3. Log out and log in again as admin/member.
