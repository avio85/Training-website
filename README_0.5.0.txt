Avi Oren Aviation 0.5.0 - Wave Export Edition

Includes:
- Daily schedule image export.
- Full training wave image export.
- Aircraft columns: Aircraft 1 / Aircraft 2, with Aircraft 3-ready export logic.
- FI colors preserved:
  Avi = blue
  Amir = green
  Vlad = purple
  Exam = red
- Exams highlighted.
- Export generated from current schedule data in the browser.

Security base:
- Keeps 0.4.2 hard fix: login/signup are not browser forms, preventing password exposure in URL.

Replace:
requirements.txt
.python-version
runtime.txt
backend/main.py
backend/requirements.txt
frontend/index.html
frontend/style.css
frontend/script.js

Keep:
frontend/assets/*
