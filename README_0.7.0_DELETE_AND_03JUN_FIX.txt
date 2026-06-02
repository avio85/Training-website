Avi Oren Aviation 0.7.0

Fixes:
- Delete button now removes the flight from waveSchedule, renders immediately, and attempts to save to DB.
- 03 Jun changes:
  - Aircraft 1 = DEMWA.
  - Aircraft 2 = DEKJJ.
  - Avi is assigned to DEKJJ / Aircraft 2.
  - Vlad is assigned to DEMWA / Aircraft 1.
  - DEMWA / Aircraft 1 at 1200 is empty.
  - DEMWA / Aircraft 1 at 1000 note: "Finish by 1100".
- Backend normalizes persisted June wave data on load/startup.
- Frontend normalizes before render/export.

Replace:
frontend/index.html
frontend/script.js
frontend/style.css
backend/main.py
backend/requirements.txt
requirements.txt
.python-version
runtime.txt
