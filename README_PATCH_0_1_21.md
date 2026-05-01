# Patch 0.1.21 — Dashboard, briefing room, admin, METAR/NOTAM

Replace:
- `frontend/index.html`
- `frontend/style.css`
- `frontend/script.js`
- `backend/main.py`

Changes:
- Dashboard text updated.
- “My Schedule” changed to “Training schedule”.
- Homepage weather now uses backend METAR-derived info instead of Open-Meteo.
- Briefing Room heading changed to “Airports charts”.
- LHPP/LHSM VAC/ADC PDFs now load inside the chart viewer like LHKA.
- Admin panel reorganized:
  - Manage training waves
  - Manage students
  - Manage FIs
  - Manage airplanes
  - User approvals
  - ATPL AI link
- Removed Upload Briefing / ATO Certificate card from Admin.
- Removed the training wave explanatory note above the schedule.
- NOTAM endpoint now tries metar-taf.com and metar.cloud before fallback.
- Version updated to 0.1.21.

After upload:
1. Commit.
2. Render → Manual Deploy → Clear build cache & deploy.
3. Hard refresh browser (Ctrl+F5).
