Avi Oren Aviation 0.6.8

Fixes:
- Edit flight student dropdown loads all DB students from /api/students.
- Handles backend /api/students returning an array (current backend behavior).
- Ensures Nir Kohol appears as Time Building even if DB load fails.
- Adds backend admin endpoint /api/wave-schedule/june-replace-lior.
- On June wave load, persisted DB schedule is patched:
  Lior A from 4 June onward -> Nir Kohol
  Lior 3 June slots are reassigned because Nir arrives only 4 June.
- Adds console helper: fixJuneLiorNow()

Replace:
frontend/index.html
frontend/script.js
frontend/style.css
backend/main.py
backend/requirements.txt
requirements.txt
.python-version
runtime.txt
