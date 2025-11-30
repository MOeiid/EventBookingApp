# Event Booking App

A small React Native app (Expo) for browsing and registering events. Includes Redux and a mock-data fallback so the app runs without a backend.

Quick start

```bash
npm install
npm run start
npm run android
```

Project layout

```
EventBookingApp/
├─ App.tsx
├─ index.js
├─ screens/
├─ navigation/
├─ store/
├─ services/
├─ components/
└─ assets/
```

Main screens

- Login
- Sign Up
- Events (list)
- Event Details
- Dashboard

API (expected)

- `POST /auth/login`
- `POST /auth/signup`
- `GET /events`
- `GET /events/:id`
- `POST /registrations`
- `GET /registrations?userId=:id`
- `DELETE /registrations/:id`

Tips

- Use `npx expo start --tunnel --dev-client` for device testing
- If dependencies fail, run `npm install` and restart
- Check `services/api.ts` when API calls fail

License: MIT

If you want it shorter, translated to Arabic, or even more compact (single-command start), tell me which parts to remove.
