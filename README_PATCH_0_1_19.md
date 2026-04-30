# Patch 0.1.19 — Schedule data fix

Replace:
- `frontend/index.html`
- `frontend/script.js`
- `backend/main.py`

Fix:
- The schedule appeared empty because the backend returned an empty saved schedule.
- Frontend now falls back to the built May 3–10 schedule if backend returns empty.
- Backend now returns the full default wave schedule if the database has no saved wave.
- Version updated to 0.1.19.

After upload:
1. Commit.
2. Render → Manual Deploy → Clear build cache & deploy.
3. Hard refresh browser (Ctrl+F5).
4. Open Schedule again.
