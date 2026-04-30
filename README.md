# Avi Oren Aviation — Phase 2 Prototype

This is the first real operational prototype.

## What is public
- Home
- Airfield info
- Aircraft / instruments info
- Modular training page

## What requires member login
- Training schedule
- Briefing files

## Admin
Only the admin can:
- approve users
- add students
- add schedule items
- upload briefing files

## Local run
```bash
cd avi_oren_aviation_phase2
pip install -r requirements.txt
uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

Open:
http://localhost:8000

## Demo admin login
Email: admin@avioren.local
Password: ChangeMe123!

Change these in Render environment variables:
- ADMIN_EMAIL
- ADMIN_PASSWORD
- JWT_SECRET

## Render Web Service settings
Build command:
```bash
pip install -r requirements.txt
```

Start command:
```bash
uvicorn backend.main:app --host 0.0.0.0 --port $PORT
```

Important: this prototype uses SQLite and local upload storage.
For production, move database and files to Supabase / S3-compatible storage.
