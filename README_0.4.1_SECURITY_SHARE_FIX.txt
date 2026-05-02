Avi Oren Aviation 0.4.1

Critical security fix:
- Login/signup buttons are no longer submit buttons.
- Forms cannot submit by browser GET.
- Credentials are scrubbed from URL if already present.
- Change any password that appeared in the URL.

Daily schedule share fix:
- If the selected day card is not currently found in the DOM, the calendar is re-rendered and retried.
- If still not found, it generates the image from current schedule data instead of failing.
- Keeps real DOM screenshot through html2canvas whenever the card exists.

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
