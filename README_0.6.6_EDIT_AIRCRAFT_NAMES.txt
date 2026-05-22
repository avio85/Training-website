Avi Oren Aviation 0.6.6

Fixes:
- Removes the new FI stripe visually.
- Fixes edit modal student dropdown: June students are populated, including Nadav L.
- Fixes save edit: changing student/aircraft/FI updates the selected flight in waveSchedule.
- Keeps the change local until admin presses Save changes, same workflow as before.
- Adds Aircraft 1 / Aircraft 2 display name editor in the schedule page.
- Aircraft names persist per selected wave in localStorage and are used in schedule cards, slots, and legend.
- Exam flights automatically use Examiner as FI.

Replace:
frontend/index.html
frontend/script.js
frontend/style.css
backend/main.py
backend/requirements.txt
requirements.txt
.python-version
runtime.txt
