"""Render/uvicorn entrypoint for Avi Oren Aviation.

This shim keeps the clean backend/app architecture working with both common
start commands:
- uvicorn backend.main:app
- uvicorn main:app  (when the working directory is /backend)
"""
from pathlib import Path
import sys

BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from app.main import app  # noqa: E402
