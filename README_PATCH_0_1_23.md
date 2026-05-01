# Avi Oren Aviation — Patch 0.1.23 CLEAN

Replace:
- `frontend/index.html`
- `frontend/style.css`
- `frontend/script.js`
- `backend/main.py`

Changes:
- Clean rebuilt `script.js` to remove duplicate/conflicting functions.
- Fixed ATPL AI active/inactive behavior.
- Fixed Briefing Room tabs.
- Fixed LHKA/LHJK/LHPP/LHSM chart switching.
- LHPP/LHSM VAC/ADC buttons load inside the chart viewer.
- Dashboard weather uses backend aviation METAR data.
- Backend parses METAR for QNH/pressure, temperature, wind, visibility and clouds.
- NOTAM has a clearer official fallback link.
- Schedule grid remains with drag/drop and right-click student/FI edit.
- Version updated to 0.1.23.

After upload: Render → Manual Deploy → Clear build cache & deploy, then hard refresh.
