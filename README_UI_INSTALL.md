# Avi Oren Aviation — V2 Frontend UI

This ZIP replaces only the frontend of the Phase 2 backend.

## How to install

1. Open your GitHub repo.
2. Delete the current `/frontend` folder.
3. Upload this new `/frontend` folder.
4. Commit changes.
5. Render → Manual Deploy → Deploy latest commit.

No changes needed to:
- backend/main.py
- requirements.txt
- render settings

## Render settings remain

Build Command:
pip install -r requirements.txt

Start Command:
uvicorn backend.main:app --host 0.0.0.0 --port $PORT

## What changed

- Modern glass-cockpit UI
- Mobile bottom navigation
- Dashboard cards
- Timeline schedule instead of table
- Briefing file cards with categories
- Public airfield/aircraft/modular pages
- Cleaner admin workspace
