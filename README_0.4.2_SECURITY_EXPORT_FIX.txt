Avi Oren Aviation 0.4.2

Security hard fix:
- Login/signup are no longer FORM elements at all; they are DIV containers.
- Buttons are type=button and call JS directly.
- Browser cannot submit credentials as GET, so password cannot be added to URL by form submission.
- Immediate inline head scrub removes any already leaked email/password params from the address bar.
- Change any password that appeared in the URL.

Schedule image export:
- Uses a dedicated clean two-column daily export layout.
- C172 and C152 stay in separate columns for the full day.
- FI font color is preserved: Avi blue, Amir green, Solo/default neutral.
- Output includes all time slots and all aircraft info.

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
