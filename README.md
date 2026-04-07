<<<<<<< HEAD
# strike
=======
 # strike

A modern storefront built with React, Vite and Tailwind CSS. It uses Supabase for data, Zustand for cart state, and React Router for navigation.

## Tech stack

- React 19
- Vite
- Tailwind CSS
- Supabase (`@supabase/supabase-js`)
- Zustand (cart store)
- React Router DOM

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env   # on Windows PowerShell: Copy-Item .env.example .env
```

### 3. Run the dev server

```bash
npm run dev
```

The app will be available at the URL printed in the terminal (by default, http://localhost:5173).

## Scripts

- `npm run dev` – start the Vite dev server
- `npm run build` – create a production build
- `npm run preview` – preview the production build locally
- `npm run lint` – run ESLint
- `npm run seed` – seed data using `scripts/seed.js`

## Folder structure

- `src/` – React components, pages, hooks and store
- `public/` – static assets
- `supabase/` – database schema and related files
- `scripts/` – helper scripts (e.g. seeding)

---

This project is bootstrapped with Vite and customized for the strike storefront.
>>>>>>> fd48fcd (Add local README)
