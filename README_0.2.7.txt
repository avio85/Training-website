Avi Oren Aviation 0.2.7 monolith startup fix

Replace/add exactly:
- requirements.txt
- .python-version
- runtime.txt
- backend/main.py
- backend/requirements.txt
- frontend/index.html
- frontend/style.css
- frontend/script.js

Important:
- Keep your existing frontend/assets folder.
- Keep Render DATABASE_URL set to the Supabase pooler URL.
- Render start command should remain: uvicorn backend.main:app --host 0.0.0.0 --port $PORT

After deploy test:
- / should load the website
- /api/debug/db should show DB connection/tables
