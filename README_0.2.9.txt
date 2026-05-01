Avi Oren Aviation training portal - 0.2.9 auth boolean fix

Replace/add exactly:
- requirements.txt
- .python-version
- runtime.txt
- backend/main.py
- backend/requirements.txt
- frontend/index.html
- frontend/style.css
- frontend/script.js

Keep existing:
- frontend/assets/*

Fixes:
- Supabase/Postgres boolean approved field now uses Python True/False instead of integer 1/0.
- Admin user is created or reset from Render ADMIN_EMAIL / ADMIN_PASSWORD on every startup.
- Signup uses boolean false on Postgres.
- User approval uses boolean true on Postgres.
- /api/debug/db returns tables and a safe users preview.
