Avi Oren Aviation 0.3.9 SECURITY HOTFIX

Critical fix:
- Login and signup forms are forced to POST and action=javascript:void(0).
- Prevents browser default GET submission that exposes email/password in the URL.
- Scrubs any already leaked email/password query parameters from the address bar using history.replaceState.
- Keeps browser autocomplete/save-password support.

Replace:
requirements.txt
.python-version
runtime.txt
backend/main.py
backend/requirements.txt
frontend/index.html
frontend/style.css
frontend/script.js

IMPORTANT:
After deploy, change the exposed password immediately.
