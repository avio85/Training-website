Avi Oren Aviation 0.6.4

Fixes:
- Full wave export now reads the selected wave schedule via window.waveSchedule and uses selected wave dates.
- If June returns empty, frontend loads the 60-flight June seed and saves it to backend.
- Aircraft 1 is blue, Aircraft 2 is orange, Aircraft 3 is purple-ready.
- Aircraft 1 cards no longer appear orange.
- Vlad added to instructor DB seed.
- Examiner added to instructor DB seed.
- Exams show FI as Examiner.
- Legend is rebuilt dynamically from current wave aircraft and FIs.
- DB debug check runs after schedule load to verify connection in console.

Verification performed:
- JS syntax check passes.
- backend Python compiles.
- final ZIP includes 0.6.4, june_2026, AOA_JUNE_2026_SEED, Vlad, Examiner.

Replace:
frontend/index.html
frontend/script.js
frontend/style.css
backend/main.py
backend/requirements.txt
requirements.txt
.python-version
runtime.txt
