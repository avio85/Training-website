# Avi Oren Aviation - Training Management Portal

A Vite React starter website for an EASA ATO training project in Hungary.

## Run locally
```bash
npm install
npm run dev
```

## Build for production
```bash
npm run build
```

## Included modules
- Preparation before first flying
- Member-only training exercise briefings
- Home/nearby airfield briefing pages with official source links
- C172 Diesel, Garmin G1000 and flight data page
- Modular CPL(A) information page
- Demo schedule for 6 students, 2 FIs, 2 aircraft
- Student/admin management demo
- Useful links
- Contact page

## Important production notes
This is a front-end demo. Before using with real students, add:
- Real authentication and roles
- Database such as Supabase/Firebase/Postgres
- Secure file storage for briefing presentations
- Audit/logging for student records
- Privacy/GDPR-compliant handling of student personal data
- Current official charts pulled/linked from HungaroControl AIS, not static outdated chart files
