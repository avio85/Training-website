Avi Oren Aviation 0.6.9

This is a DB migration fix, not only frontend replacement.

Fixes:
- On backend startup, persisted app_settings key wave_schedule_june_2026 is migrated:
  - Lior A from 4 June onward -> Nir Kohol
  - Lior A on 3 June 1200 Aircraft 2 -> Ahmad Z
  - Lior A on 3 June 1400 Aircraft 1 -> Nadav L
- On every GET /api/wave-schedule?wave_id=june_2026, backend normalizes the saved JSON and commits it.
- Frontend also normalizes current June wave before rendering/exporting.
- Console helper: findLiorInCurrentWave()

Replace:
frontend/index.html
frontend/script.js
frontend/style.css
backend/main.py
backend/requirements.txt
requirements.txt
.python-version
runtime.txt

After deploy:
- Open June wave
- It should remove Lior automatically
- Run findLiorInCurrentWave() in console; it should return []
