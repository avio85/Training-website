# Patch 0.1.16 — only files to update/add

Replace:
- `frontend/index.html`
- `frontend/style.css`
- `frontend/script.js`
- `backend/main.py`

Add:
- `frontend/assets/documents/Part_ORA_ATO_Certificate_HU_ATO_0082.pdf`

Changes:
- Weather and Aircraft removed from the main menu and moved into Briefing Room.
- Briefing Room tabs are now:
  1. Airports
  2. Weather
  3. Aircraft
  4. Exercises
  5. Certificates
- Removed old irrelevant tabs: All Files, Preparation, CPL, etc.
- Added HU VFR chart PDF link.
- ATO certificate link now points to a static file in assets.
- Backend patched so admin actions do not fail with “User not found” after a DB reset if the token email matches ADMIN_EMAIL.
- Version updated to 0.1.16.

After upload:
1. Commit.
2. Render → Manual Deploy → Clear build cache & deploy.
3. Log out and log in again once as admin.
