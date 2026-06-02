Avi Oren Aviation 0.6.7

Changes:
- June wave: Lior A replaced by Nir Kohol from 4 June onward.
- Nir Kohol added as Time Building student.
- Lior's June 3 slots are reassigned because Nir arrives only from 4 June.
- Edit flight student dropdown now tries to load all students from the DB, not only this wave's students.
- If DB student loading fails, it falls back to local/wave student list.
- Added verifyCurrentDbFlights() console helper to inspect current DB wave flights.

Replace:
frontend/index.html
frontend/script.js
frontend/style.css
backend/main.py
backend/requirements.txt
requirements.txt
.python-version
runtime.txt
