# CENTS

A focused budgeting & personal finance workspace: pacing, allocations, deep category modules, and a powerful transactions grid. Built with React, Vite, Supabase, and modern data viz.

## ✨ Core Features

- Google OAuth (Supabase) & protected routing
- Monthly pacing gauge with forecast & variance
- Editable color‑coded budgets with alert thresholds
- Category modules (sparklines, inline edits)
- Transactions table (sorting, filtering, pagination)
- Theme tokens (light/dark) & glass UI aesthetic
- Statement parsing scaffold (PDF -> future import flow)
- Extensible server layer (Express + Supabase client)

## 🛠 Tech Stack

- React 19 + Vite 6
- React Router 7
- @tanstack/react-table for data grids
- Recharts for charts
- Moment.js for date handling
- Supabase JS v2 (Auth & future data)
- Express server utilities (PDF parsing experiment)

## 🚀 Getting Started

Prerequisites: Node.js 18+

1. Install dependencies

   ```bash
   npm install
   ```

2. Configure environment (create a `.env.local` at the project root)

   ```bash
   # .env.local
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_API_KEY=your_supabase_anon_key
   ```

3. Run dev

   ```bash
   npm run dev
   ```

   Visit <http://localhost:5173>

Optional: start the server utilities (WIP)

```bash
npm run server
```

## 🔐 Supabase OAuth callback

Add this Redirect URL in your Supabase project Auth settings:

```text
http://localhost:5173/auth/callback
```

## 📁 Project structure

src/
  components/
    budget/
    dashboard/
    transactions/
  context/
  data/
  hooks/
  layout/
  pages/
server/

```text
.
├─ public/
├─ server/
│  ├─ middleware/
│  └─ services/
└─ src/
   ├─ components/
   │  └─ dashboard/
   ├─ context/
   ├─ hooks/
   ├─ layout/
   └─ pages/
```

## 🧭 Roadmap

- CSV/PDF transaction import pipeline
- Rule-based auto categorization & tagging
- Historical rollovers & envelope style reserves
- User preferences & theming page
- Alerting (email / push) for threshold breaches
- AI spending anomaly & forecast insights

---
Crafted with care — iterate, extend, and make your cents count.
(WIP).
