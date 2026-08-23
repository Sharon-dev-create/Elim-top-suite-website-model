# Elim Top Suites

A React (Vite) single-page app for Elim Top Suites — Rayfield, Jos. Includes a
working booking form and contact form.

## Stack

- React 19 + Vite
- React Router (client-side routing: `/`, `/booking`, `/contact`)
- Tailwind CSS (design tokens ported from the original static mockup)
- EmailJS (`@emailjs/browser`) for sending booking/contact emails straight
  from the browser — no backend server required

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## How booking data works right now

Every booking submitted on `/booking` is saved to the browser's
`localStorage` (see `src/context/BookingContext.jsx`) under the key
`elim-top-suites:bookings` — this is the lightweight "database." That part
works immediately, with no setup.

Email delivery is optional and layered on top: if EmailJS environment
variables are set, the form also emails the booking. If they're not set, the
booking still succeeds and is saved locally; the confirmation screen just
notes that email isn't configured yet.

### Turning on email delivery

1. Create a free account at https://www.emailjs.com
2. Add an **Email Service** (Gmail, Outlook, etc.) — note the Service ID
3. Create an **Email Template** for bookings with variables: `guest_name`,
   `guest_email`, `guest_phone`, `room_name`, `check_in`, `check_out`,
   `guests`, `total`, `notes`, `booking_ref` — note the Template ID
4. Create a second template for the contact form with `from_name`,
   `from_email`, `message` — note that Template ID
5. Copy `.env.example` to `.env` and fill in your Service ID, both Template
   IDs, and your Public Key (Account → API Keys)
6. Restart `npm run dev`

## Project structure

```
src/
  components/   Navbar, Footer, RoomCard
  context/      BookingContext (localStorage-backed booking store)
  data/         rooms.js — room catalog + price/currency helpers
  lib/          emailjs.js — EmailJS wrapper
  pages/        Home, Booking, Contact
```

## Growing this into a "real" backend later

`localStorage` only lives in one browser, so it's a good stand-in while
building but not a real multi-device database. When ready to go further, a
natural next step is swapping `BookingContext` for calls to a hosted
database (e.g. Supabase, Firebase, or a small Express/Node API) without
touching the rest of the UI — the rest of the app only talks to
`useBookings()`.

## Build for production

```bash
npm run build
npm run preview
```

Outputs a static `dist/` folder deployable to Netlify, Vercel, GitHub Pages,
or any static host.
