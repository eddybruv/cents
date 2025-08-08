# Vault

A minimal, modern personal finance dashboard to visualize balances, spending trends, and card summaries. Built with React, Vite, Tailwind CSS, and Supabase Auth.

## ✨ Features

- Google Sign‑In with Supabase (OAuth) and protected routes
- Clean dashboard UI with summary cards and a card carousel
- Responsive design powered by Tailwind CSS v4 and Font Awesome icons
- Utility for parsing PDF statements (experimental server helper)
- Scaffold for AI insights (OpenAI config placeholder)

## 🛠 Tech Stack

- React 19, React Router 7
- Vite 6
- Tailwind CSS 4
- Supabase JS v2
- Font Awesome 6
- Node/Express scaffold, pdf-parse (server utilities)

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

3. Start the web app

   ```bash
   npm run dev
   ```

   Open <http://localhost:5173>

Optional: start the server utilities (WIP)

```bash
npm run server
```

## 🔐 Supabase OAuth callback

Add this Redirect URL in your Supabase project Auth settings:

- <http://localhost:5173/auth/callback>

## 📁 Project structure

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

## 📜 Scripts

- dev: Vite dev server
- build: Production build
- preview: Preview production build
- lint: ESLint
- server: Nodemon (watches `server/`, WIP)

## 📝 Notes

- App title is set to “Vault” in `index.html`.
- `src/supabase.js` logs env details for debugging. Remove or adjust for production.

## 🗺 Roadmap

- Link parsed transactions from PDFs into the dashboard
- AI-powered spending insights and categorization
- Data persistence and user settings

—
WIP. Contributions and feedback welcome.
