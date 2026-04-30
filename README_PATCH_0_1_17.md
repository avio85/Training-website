# Patch 0.1.17 — only files to update

Replace:
- `frontend/index.html`
- `frontend/style.css`
- `frontend/script.js`
- `backend/main.py`

Changes:
- Removed login modal message: “Google login placeholder…”
- Added browser autocomplete for login fields.
- Updated chart links:
  - LHJK VFR manual page
  - LHPP VAC + ADC PDFs
  - LHSM VAC + ADC PDFs
- Added AIP / IFR charts link.
- Added Hungary VFR Manual link.
- Added HU VFR chart link remains in Airports tab.
- Added new Briefing Room tab: NOTAM.
- NOTAM defaults to LHKE and allows selecting other airports.
- Added backend `/api/notam/{icao}` endpoint with manual fallback.
- Version updated to 0.1.17.

After upload:
1. Commit.
2. Render → Manual Deploy → Clear build cache & deploy.
3. Refresh browser hard (Ctrl+F5) if old JS is cached.
