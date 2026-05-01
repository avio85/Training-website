Avi Oren Aviation Training Portal - 0.3.2

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

Changes:
- Admin/instructor can filter schedule by any student.
- Students can be edited/deleted from Admin > People.
- User/student matching remains available under Admin > Users.
- NOTAM section no longer uses airport-info/METAR pages. It attempts a raw public NOTAM mirror first, then shows official EAD / NetBriefing / FAA verification links if no aerodrome-specific NOTAM is found.

Important:
- NOTAM output must always be verified with official briefing sources before flight.
