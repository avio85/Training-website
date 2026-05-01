Avi Oren Aviation 0.2.3 - Supabase DB patch

Replace/add this GitHub structure:
- backend/main.py
- backend/app/*
- backend/requirements.txt
- frontend/index.html
- frontend/style.css
- frontend/script.js

Render environment variables to add:
- DATABASE_URL = your Supabase PostgreSQL connection string
  Example format:
  postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres

Keep also:
- JWT_SECRET = long random secret
- ADMIN_EMAIL = your admin email
- ADMIN_PASSWORD = your admin password

Important:
- Use Supabase Project Settings > Database > Connection string.
- Do not use the Supabase anon key for backend database writes.
- The backend auto-creates the required tables on startup.
- If DATABASE_URL is missing, the app falls back to SQLite for local testing.
