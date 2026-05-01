0.2.12 token/admin + dashboard pressure fix

Replace exactly:
- requirements.txt
- .python-version
- runtime.txt
- backend/main.py
- backend/requirements.txt
- frontend/index.html
- frontend/style.css
- frontend/script.js

After deploy: logout, hard refresh, login again as admin. Old JWTs generated before 0.2.12 are invalid because Supabase had integer IDs; this patch creates string JWT subjects and looks users up by email.
