# Avi Oren Aviation — Version 0.1.8

## Changes
- CPL Modular page redesigned as a BAA-style scrolling roadmap.
- Aircraft page redesigned as a real study hub with sections for C172 Diesel, G1000, pre-flight, flight data and videos.
- Added direct reference button to the C172 Diesel POH:
  https://www.tmg-service.de/doc-download/manuals/POH%20C-172_2.0S_RS_2-6.pdf
- Weather page redesigned with public METAR/TAF panel and a clearer HungaroMet connector panel.
- Chart links corrected:
  - LHKA: provided Kalocsa VFR PDF
  - LHJK: direct HungaroControl PDF
  - LHPP: AIP VAC PDF
  - LHSM: AIP VAC PDF
- Version updated to 0.1.8.

## Important weather note
I cannot verify the protected aviation.met.hu connector without valid login credentials and access to the protected form.
This version adds clearer diagnostics. If it fails, copy the connector output and Render logs.
You may need to set:
- AVIATION_MET_USERNAME
- AVIATION_MET_PASSWORD
- AVIATION_MET_LOGIN_URL
- AVIATION_MET_DATA_URL
- AVIATION_MET_USER_FIELD
- AVIATION_MET_PASS_FIELD

## Install
Replace/upload:
- /frontend
- /backend/main.py
- requirements.txt
- runtime.txt

Then Render:
- Manual Deploy → Clear build cache & deploy
