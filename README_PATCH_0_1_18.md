# Patch 0.1.18 — Schedule Wave

Replace:
- `frontend/index.html`
- `frontend/style.css`
- `frontend/script.js`
- `backend/main.py`

Changes:
- Schedule module now shows only the May 3–10 training wave.
- Visual aircraft differentiation:
  - C172 blue
  - C152 amber
- Instructor differentiation:
  - Avi blue
  - Amir green
- EXAM slots highlighted.
- Users can only view.
- Admin can drag & drop flights between slots and save.
- Backend endpoint `/api/wave-schedule` added to persist the wave schedule in app_settings.
- Version updated to 0.1.18.

After upload:
1. Commit.
2. Render → Manual Deploy → Clear build cache & deploy.
3. Log out/in as admin to get a fresh token.
