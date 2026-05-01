import os
from pathlib import Path

APP_NAME = "Avi Oren Aviation"
APP_VERSION = "0.2.0"
JWT_SECRET = os.getenv("JWT_SECRET", "change-this-secret-before-production")
DB_PATH = os.getenv("DB_PATH", "avi_aviation.db")
UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "uploads"))
ROOT_DIR = Path(__file__).resolve().parents[2]
FRONTEND_DIR = Path(os.getenv("FRONTEND_DIR", str(ROOT_DIR / "frontend")))
if not FRONTEND_DIR.exists():
    FRONTEND_DIR = Path("frontend")
