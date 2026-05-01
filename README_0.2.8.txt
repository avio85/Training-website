Avi Oren Aviation - 0.2.8 stable restore

Replace/add exactly:
- requirements.txt
- .python-version
- runtime.txt
- backend/main.py
- backend/requirements.txt
- frontend/index.html
- frontend/style.css
- frontend/script.js

Keep frontend/assets/* unchanged.

Fixes:
- Restores CSS/JS routes so UI is not plain HTML.
- Keeps /api/debug/db before frontend catch-all.
- Uses Supabase pooler via DATABASE_URL.
- Migrates earlier temporary users table and recreates/updates admin from ADMIN_EMAIL/ADMIN_PASSWORD.
