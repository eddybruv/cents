import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Pill = ({ children }) => (
  <span className="px-2 py-1 rounded-full bg-(--color-surface) border border-(--color-border) text-[11px] tracking-wide">
    {children}
  </span>
);
const Feature = ({ title, desc }) => (
  <div className="p-5 rounded-lg glass border border-(--color-border)">
    <h3 className="text-base font-semibold mb-1">{title}</h3>
    <p className="text-(--color-muted) text-sm leading-relaxed">{desc}</p>
  </div>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-fg) flex flex-col">
      {/* Header */}
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="cents" className="h-6 w-auto" />
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-md bg-(--color-accent) text-black text-sm font-semibold hover:opacity-90 transition"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(650px 650px at 50% 50%, var(--color-accent), transparent)",
            }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24 text-center">
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            <Pill>Budget pacing</Pill>
            <Pill>Smart allocations</Pill>
            <Pill>Transaction grid</Pill>
            <Pill>Forecasting</Pill>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Every dollar, in one focused budgeting workspace.
          </h1>
          <p className="mt-5 text-(--color-muted) text-lg max-w-2xl mx-auto">
            cents is a fast, minimal personal finance app that helps you pace
            spending, visualize category burn, and stay ahead of month‑end
            surprises.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              to="/login"
              className="px-5 py-3 rounded-md bg-(--color-accent) text-black font-semibold hover:opacity-90 transition"
            >
              Get started
            </Link>
            <a
              href="#features"
              className="px-5 py-3 rounded-md border border-(--color-border) text-sm hover:border-(--color-accent) transition"
            >
              Explore features
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20 -mt-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Feature
            title="Real budget pacing"
            desc="Gauge spend vs time with dynamic monthly pacing and overspend forecasting."
          />
          <Feature
            title="Editable categories"
            desc="Create, color‑code, and tune alert thresholds for each budget line."
          />
          <Feature
            title="Deep dive modules"
            desc="Per‑category modules with trend sparkline and quick inline editing."
          />
          <Feature
            title="Transaction intelligence"
            desc="Powerful sortable, filterable table ready for imports and tagging."
          />
          <Feature
            title="Rapid imports (WIP)"
            desc="Statement parsing foundation prepared for CSV/PDF ingestion."
          />
          <Feature
            title="Secure auth"
            desc="Google OAuth via Supabase with protected routes and session handling."
          />
          <Feature
            title="Dark mode ready"
            desc="Theme system with design tokens and subtle glass effects."
          />
          <Feature
            title="Performance stack"
            desc="React + Vite + modern table & chart libs for a snappy UX."
          />
          <Feature
            title="Foresight"
            desc="Variance & projected spend help you act before overruns land."
          />
        </div>
      </section>

      <footer className="mt-auto py-10 text-center text-(--color-muted) text-xs">
        <p>© {new Date().getFullYear()} cents. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
