Avi Oren Aviation 0.7.2

This build replaces the original export functions directly instead of appending overrides.

Fixes:
- Daily export chooser now uses current selected wave dates from getWaveDaysForCurrentWave().
- Removed old direct waveDays usage from openShareDailyScheduleModal().
- Full wave export now uses current selected wave aircraft from getWaveAircraftForCurrentWave().
- Removed old hardcoded Aircraft 1 / Aircraft 2 labels in the full-wave export function.
- Export now displays aircraft display/tail name.
- Export now displays notes/remarks.
- Cards enlarged to fit FI, aircraft name, and note.

Verified:
- JS syntax passes.
- Backend Python compiles.
- openShareDailyScheduleModal no longer uses waveDays directly.
- drawWaveDayCard no longer hardcodes Aircraft 1 / Aircraft 2 text.
- Only one function definition exists for the replaced export functions.

Replace:
frontend/index.html
frontend/script.js
frontend/style.css
backend/main.py
backend/requirements.txt
requirements.txt
.python-version
runtime.txt
