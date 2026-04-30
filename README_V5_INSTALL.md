# Avi Oren Aviation — V5 Weather Connector + Briefing Room Fix

## Replace/upload these files in GitHub
- `/frontend`
- `/backend/main.py`
- `requirements.txt`
- `runtime.txt`

Then Render:
- Manual Deploy → Clear build cache & deploy

## Weather connector setup in Render
Add these environment variables:
- `AVIATION_MET_USERNAME`
- `AVIATION_MET_PASSWORD`

Optional if aviation.met.hu uses different login fields:
- `AVIATION_MET_LOGIN_URL`
- `AVIATION_MET_DATA_URL`
- `AVIATION_MET_USER_FIELD`
- `AVIATION_MET_PASS_FIELD`

Do not put the weather login details inside the frontend.

## Where to upload exercises presentations
Admin Workspace → Upload Briefing / ATO Certificate → category `Exercises`.
