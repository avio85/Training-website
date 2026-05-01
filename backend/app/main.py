from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .config import APP_NAME, UPLOAD_DIR, FRONTEND_DIR
from .db import init_db, db_status
from .routers import auth_users, settings, weather, schedule, notam, admin_data

app = FastAPI(title=APP_NAME)

@app.on_event("startup")
def startup_init_db():
    try:
        init_db()
        print("Database tables initialized", flush=True)
    except Exception as e:
        print(f"DB INIT ERROR: {e}", flush=True)

@app.get("/api/debug/db")
def debug_db():
    return db_status()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
for router in [auth_users.router, settings.router, weather.router, schedule.router, notam.router, admin_data.router]:
    app.include_router(router)
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")
app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="frontend")
