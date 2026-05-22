Avi Oren Aviation 0.6.2 VERIFIED Multi-Wave Fix

What was verified before packaging:
- backend/main.py now contains "training-waves" and "june_2026" route/data logic.
- frontend/script.js now contains backend-driven wave loading using /api/wave-schedule?wave_id=...
- frontend/index.html visible version updated to 0.6.2.
- June wave is seeded in backend with real June 3-8 flights.

Replace:
frontend/index.html
frontend/script.js
frontend/style.css
backend/main.py
backend/requirements.txt
requirements.txt
.python-version
runtime.txt

Keep:
frontend/assets/*

After deployment:
1. Hard refresh.
2. Login as admin.
3. Go to Schedule.
4. Choose June 3–8.
5. It should show June dates and Aircraft 1 / Aircraft 2 with seeded June flights.
