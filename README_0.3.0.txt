Avi Oren Aviation Training Portal - 0.3.0 Schedule Manager

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

New in 0.3.0:
- Admin schedule manager: add, edit, delete flights.
- Schedule save persists to Supabase schedule table.
- Startup verifies/seeds the default training wave into the schedule DB.
- Admin Verify DB button checks/repairs default schedule entries.
- User admin: approve, suspend, delete, and role switch for admin/instructor/student.
- Aircraft list fixed to C172/C152.
- Version updated to 0.3.0.

After deploy:
1. Logout and hard refresh.
2. Login as admin.
3. Open Schedule and press Verify DB once.
4. Add/edit/delete one flight and press Save changes.
5. Refresh and confirm the change remains.
