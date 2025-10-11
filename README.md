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

2. Configure environment variables

   Create a `.env` file at the project root with the following variables:

   ```bash
   # Server Configuration
   PORT=8000

   # OpenAI API (for future AI insights)
   OPENAI_API_KEY=your_openai_api_key

   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_API_KEY=your_supabase_anon_key

   # Plaid API Configuration (for bank connections)
   VITE_PLAID_CLIENT_ID=your_plaid_client_id
   VITE_PLAID_SECRET=your_plaid_secret
   VITE_PLAID_ENV=sandbox # or 'development' or 'production'
   VITE_PLAID_PRODUCTS=transactions,auth,income,balance,investments
   VITE_PLAID_COUNTRY_CODES=CA # or 'US', 'GB', etc.
   VITE_PLAID_REDIRECT_URI=http://localhost:5173/plaid-redirect
   ```

   **Note:** Never commit your `.env` file to version control. Add it to `.gitignore`.

3. Run dev server

   ```bash
   npm run dev
   ```

   Visit <http://localhost:5173>

4. (Optional) Start the backend API server

   ```bash
   npm run server
   ```

   Server runs on <http://localhost:8000>

## 🔐 Supabase OAuth callback

Add this Redirect URL in your Supabase project Auth settings:

```text
http://localhost:5173/auth/callback
```

## 🏦 Plaid Setup (Optional)

To enable bank account connections:

1. Sign up for a free [Plaid account](https://plaid.com/)
2. Get your credentials from the Plaid Dashboard
3. Add them to your `.env` file
4. Configure allowed redirect URIs in Plaid Dashboard:

   ```text
   http://localhost:5173/plaid-redirect
   ```

## 📁 Project structure

```text
.
├─ public/
├─ server/
│  ├─ middleware/
│  └─ services/
└─ src/
   ├─ components/
   │  └─ budget/
   │  └─ dashboard/
   │  └─ transactions/
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
