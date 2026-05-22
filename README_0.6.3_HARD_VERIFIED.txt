Avi Oren Aviation 0.6.3 HARD VERIFIED

What is fixed:
- June wave now has a hard frontend seed of 60 flights.
- If backend returns empty June, frontend immediately loads the June seed and tries to save it back.
- Switcher functions are assigned to window.* so old functions cannot win.
- Render/export functions use selected wave dates and aircraft.
- Wave status text shows selected wave and number of loaded flights.

Verification performed:
- JS syntax check passes with node --check.
- backend/main.py syntax compiles.
- ZIP contains june_2026 in backend, frontend, and index.
- June seed contains 60 flight records.

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
1. Hard refresh / clear site data.
2. Login.
3. Open Schedule.
4. Select June 3–8.
5. You should see status: June 3–8 · 60 flights.
