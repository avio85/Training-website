Avi Oren Aviation 0.3.8

Real schedule screenshot export:
- Adds html2canvas to capture the actual day schedule card from the rendered system UI.
- The schedule day header has a clear "📸 Share image" button.
- On mobile it attempts native share first, then downloads PNG if sharing is blocked.
- Fallback canvas generator remains available if html2canvas CDN cannot load.

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
