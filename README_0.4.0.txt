Avi Oren Aviation 0.4.0

Security base: includes 0.3.9 login URL password hotfix.

Daily schedule share:
- Removed reliance on small day-header icon.
- Adds a clear toolbar button: "📸 Share daily schedule".
- Opens a modal to choose the day.
- Captures the real rendered schedule day card with html2canvas, so the image looks like the website.
- Falls back to clean generated canvas if html2canvas cannot load.

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
