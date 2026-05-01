Avi Oren Aviation Training Portal - 0.3.1

Replace/add these files in GitHub:
- requirements.txt
- .python-version
- runtime.txt
- backend/main.py
- backend/requirements.txt
- frontend/index.html
- frontend/style.css
- frontend/script.js

Keep existing frontend/assets/*

Changes:
- Login form keeps browser autocomplete and remembers last email.
- Students are seeded/verified in Supabase from the real May training wave names.
- FIs are stored in Supabase instructors table and loaded into Add/Edit flight.
- Add/Edit flight now uses DB students and DB instructors.
- Admin can link a website user to a student profile.
- Schedule has All flights / My flights filter.
- Admin panel reorganized into tabs: Users, Students & FIs, Schedule tools, Settings.
- NOTAM section no longer displays fake airport/general info as NOTAM. It shows official briefing links until a verified NOTAM API is connected.
