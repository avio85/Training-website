Avi Oren Aviation training portal - 0.2.0 clean architecture

Replace/add these folders exactly in GitHub:
- backend/main.py
- backend/app/*
- frontend/index.html
- frontend/style.css
- frontend/script.js

Keep your existing assets folder under frontend/assets.

Render startup can remain either:
- cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
or, from repo root:
- uvicorn backend.main:app --host 0.0.0.0 --port $PORT

Core changes:
- Backend split into app/config.py, db.py, auth.py, routers/*.py.
- Stable ATPL AI settings endpoint.
- Stable LHKA dashboard weather + sunrise/sunset from backend.
- Stable schedule fallback if saved DB schedule is empty/corrupt.
- Airport chart links are real target=_blank links and also update viewer.
- Schedule dates forced to English.
- Wave switcher removed for now.
