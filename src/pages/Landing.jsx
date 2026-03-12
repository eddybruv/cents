import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

/* ── Animated counter ────────────────────────────────────── */
const Counter = ({ end, suffix = "", prefix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return (
    <span className="font-mono tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

/* ── Mini chart for the bento preview ────────────────────── */
const MiniChart = () => {
  const bars = [35, 52, 44, 68, 58, 72, 48, 85, 62, 78, 55, 90];
  return (
    <div className="flex items-end gap-[3px] h-16">
      {bars.map((h, i) => (
        <div
          key={i}
          className="animate-in flex-1 rounded-sm"
          style={{
            height: `${h}%`,
            background:
              i === bars.length - 1
                ? "var(--color-accent)"
                : "var(--color-border-strong)",
            animationDelay: `${0.8 + i * 0.04}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ── Bento mock cards ────────────────────────────────────── */
const BentoCard = ({ children, className = "", delay = 0, float = "" }) => (
  <div
    className={`animate-in rounded-xl border border-(--color-border) bg-(--color-bg) p-4 ${float} ${className}`}
    style={{
      animationDelay: `${delay}s`,
      boxShadow: "var(--shadow-card)",
    }}
  >
    {children}
  </div>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-fg) flex flex-col overflow-hidden relative noise-overlay">
      {/* ── Grid background ──────────────────────────────── */}
      <div
        className="absolute inset-0 grid-bg grid-bg-fade pointer-events-none"
        aria-hidden
      />

      {/* ── Ambient glows ────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full blur-[160px]"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent) 0%, transparent 60%)",
            opacity: 0.12,
          }}
        />
        <div
          className="absolute top-[60%] -left-[200px] w-[600px] h-[600px] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, #6366f1 0%, transparent 60%)",
            opacity: 0.06,
          }}
        />
        <div
          className="absolute top-[20%] -right-[200px] w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, var(--color-gold) 0%, transparent 60%)",
            opacity: 0.04,
          }}
        />
      </div>

      {/* ── Header ───────────────────────────────────────── */}
      <header className="relative z-10 animate-in max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="cents" className="h-5 w-auto" />
        </Link>
        <div className="flex items-center gap-4">
          <a
            href="#features"
            className="hidden sm:inline text-[13px] text-(--color-muted) hover:text-(--color-fg) transition-colors"
          >
            Features
          </a>
          <Link to="/login" className="btn-primary text-[13px]">
            Sign in
          </Link>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-8">
        {/* Tagline chip */}
        <div
          className="animate-in stagger-1 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-(--color-border-strong) mb-8"
          style={{ background: "var(--color-surface)" }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--color-accent)" }}
          />
          <span className="text-[11px] font-medium text-(--color-muted) tracking-wide">
            Personal finance, reimagined
          </span>
        </div>

        {/* Main headline */}
        <h1 className="animate-in stagger-2 text-center max-w-4xl">
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95]">
            Know where
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] mt-1">
            every{" "}
            <span className="accent-underline">cent</span>{" "}
            goes
          </span>
        </h1>

        <p className="animate-in stagger-3 mt-6 sm:mt-8 text-(--color-muted) text-base sm:text-lg max-w-lg mx-auto text-center leading-relaxed">
          Budget pacing, live bank sync, and category intelligence — all in one
          fast, minimal workspace.
        </p>

        <div className="animate-in stagger-4 mt-8 sm:mt-10 flex items-center gap-3">
          <Link
            to="/login"
            className="btn-primary text-sm sm:text-base px-7 py-2.5"
          >
            Get started free
          </Link>
          <a
            href="#features"
            className="btn-secondary text-sm sm:text-base px-7 py-2.5"
          >
            See how it works
          </a>
        </div>

        {/* ── Bento dashboard preview ────────────────────── */}
        <div className="mt-14 sm:mt-20 w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-3 sm:gap-4">
            {/* KPI: Budget */}
            <BentoCard
              className="col-span-2 sm:col-span-3"
              delay={0.6}
              float="animate-float"
            >
              <p className="text-[10px] uppercase tracking-widest text-(--color-muted) mb-1">
                Budget
              </p>
              <p className="text-lg sm:text-xl font-bold font-mono tabular-nums tracking-tight">
                $<Counter end={4200} />
              </p>
            </BentoCard>

            {/* KPI: Spent */}
            <BentoCard
              className="col-span-2 sm:col-span-3"
              delay={0.7}
              float="animate-float-delayed"
            >
              <p className="text-[10px] uppercase tracking-widest text-(--color-muted) mb-1">
                Spent MTD
              </p>
              <p className="text-lg sm:text-xl font-bold font-mono tabular-nums tracking-tight">
                $<Counter end={2847} duration={2200} />
              </p>
            </BentoCard>

            {/* Chart */}
            <BentoCard
              className="col-span-4 sm:col-span-6 row-span-2"
              delay={0.8}
              float="animate-float-slow"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] uppercase tracking-widest text-(--color-muted)">
                  Spending overview
                </p>
                <span className="text-[10px] font-mono text-(--color-accent)">
                  Mar 2026
                </span>
              </div>
              <MiniChart />
              <div className="flex justify-between mt-3 text-[10px] text-(--color-muted) font-mono">
                <span>1</span>
                <span>6</span>
                <span>12</span>
              </div>
            </BentoCard>

            {/* KPI: Remaining */}
            <BentoCard
              className="col-span-2 sm:col-span-3"
              delay={0.9}
            >
              <p className="text-[10px] uppercase tracking-widest text-(--color-muted) mb-1">
                Remaining
              </p>
              <p
                className="text-lg sm:text-xl font-bold font-mono tabular-nums tracking-tight"
                style={{ color: "var(--color-accent)" }}
              >
                $<Counter end={1353} duration={2400} />
              </p>
            </BentoCard>

            {/* KPI: Pacing */}
            <BentoCard
              className="col-span-2 sm:col-span-3"
              delay={1.0}
            >
              <p className="text-[10px] uppercase tracking-widest text-(--color-muted) mb-1">
                Pacing
              </p>
              <p className="text-lg sm:text-xl font-bold font-mono tabular-nums tracking-tight">
                <Counter end={68} suffix="%" duration={1800} />
              </p>
              <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: "var(--color-surface-elevated)" }}>
                <div
                  className="h-full rounded-full animate-in"
                  style={{
                    width: "68%",
                    background: "var(--color-accent)",
                    animationDelay: "1.5s",
                  }}
                />
              </div>
            </BentoCard>

            {/* Categories mini */}
            <BentoCard
              className="col-span-4 sm:col-span-4"
              delay={1.1}
              float="animate-float-delayed"
            >
              <p className="text-[10px] uppercase tracking-widest text-(--color-muted) mb-2.5">
                Categories
              </p>
              {[
                ["Groceries", "$620", "#34d399", 72],
                ["Dining", "$340", "#f59e0b", 48],
                ["Transport", "$180", "#6366f1", 30],
              ].map(([name, amt, color, pct]) => (
                <div key={name} className="flex items-center gap-2 mb-2 last:mb-0">
                  <span
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ background: color }}
                  />
                  <span className="text-[11px] flex-1">{name}</span>
                  <span className="text-[11px] font-mono text-(--color-muted)">
                    {amt}
                  </span>
                  <div className="w-12 h-1 rounded-full overflow-hidden" style={{ background: "var(--color-surface-elevated)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                </div>
              ))}
            </BentoCard>

            {/* Recent transactions mini */}
            <BentoCard
              className="col-span-4 sm:col-span-4"
              delay={1.2}
            >
              <p className="text-[10px] uppercase tracking-widest text-(--color-muted) mb-2.5">
                Recent
              </p>
              {[
                ["Whole Foods", "-$84.20", "text-red-400"],
                ["Uber", "-$12.50", "text-red-400"],
                ["Payroll", "+$3,200", "text-emerald-400"],
              ].map(([name, amt, color]) => (
                <div
                  key={name}
                  className="flex items-center justify-between py-1.5 border-b border-(--color-border) last:border-0"
                >
                  <span className="text-[11px]">{name}</span>
                  <span className={`text-[11px] font-mono ${color}`}>{amt}</span>
                </div>
              ))}
            </BentoCard>

            {/* Bank sync mini */}
            <BentoCard
              className="col-span-4 sm:col-span-4"
              delay={1.3}
              float="animate-float"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded-md flex items-center justify-center text-[10px]" style={{ background: "var(--color-surface-elevated)" }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-(--color-muted)">
                  Bank sync
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--color-accent)", animation: "pulseGlow 2s ease-in-out infinite" }}
                />
                <span className="text-[11px] text-(--color-accent) font-medium">
                  Connected &middot; Live
                </span>
              </div>
            </BentoCard>
          </div>

          {/* Fade-out gradient at bottom of bento */}
          <div
            className="h-24 -mt-24 relative z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--color-bg))",
            }}
          />
        </div>
      </section>

      {/* ── Scrolling ticker ─────────────────────────────── */}
      <div className="relative z-10 border-y border-(--color-border) overflow-hidden py-4">
        <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
          {[...Array(2)].map((_, dup) => (
            <React.Fragment key={dup}>
              {[
                "Budget pacing",
                "Plaid bank sync",
                "10 categories",
                "Stacked area charts",
                "Transaction tagging",
                "Dark & light modes",
                "Overspend alerts",
                "Google OAuth",
                "CSV import",
                "Monthly forecasting",
                "Sparkline trends",
                "Category intelligence",
              ].map((t) => (
                <span
                  key={`${dup}-${t}`}
                  className="text-[13px] font-medium text-(--color-muted) flex items-center gap-3"
                >
                  <span
                    className="h-1 w-1 rounded-full flex-shrink-0"
                    style={{ background: "var(--color-accent)" }}
                  />
                  {t}
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Features section ─────────────────────────────── */}
      <section
        id="features"
        className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-28"
      >
        <div className="text-center mb-14">
          <p className="text-[11px] font-mono font-medium tracking-widest uppercase text-(--color-accent) mb-3">
            // capabilities
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter">
            Built for clarity,<br />not complexity
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-(--color-border) rounded-2xl overflow-hidden">
          {[
            {
              title: "Budget pacing",
              desc: "See spend vs. time in real-time. Know if you're over or under pace at a glance.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ),
            },
            {
              title: "Live bank sync",
              desc: "Connect accounts via Plaid. Transactions import automatically — no CSV wrangling.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              ),
            },
            {
              title: "Category intelligence",
              desc: "Transactions auto-categorize via Plaid taxonomy, mapped to 10 clear budget lines.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              ),
            },
            {
              title: "Spending charts",
              desc: "Stacked area charts with category toggles and brush selection for any date range.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
            },
            {
              title: "Transaction grid",
              desc: "Sort, search, filter, and paginate. Edit categories and descriptions inline.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              ),
            },
            {
              title: "Dark & light",
              desc: "Refined theme system with design tokens and atmospheric glass effects.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ),
            },
          ].map((f, i) => (
            <div
              key={f.title}
              className="bg-(--color-bg) p-6 sm:p-8 group hover:bg-(--color-surface) transition-colors duration-300"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 text-(--color-muted) group-hover:text-(--color-accent) transition-colors duration-300"
                style={{ background: "var(--color-surface-elevated)" }}
              >
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold mb-1.5 tracking-tight">
                {f.title}
              </h3>
              <p className="text-[13px] text-(--color-muted) leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────── */}
      <section className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center py-16 sm:py-20 rounded-2xl border border-(--color-border)" style={{ background: "var(--color-surface)" }}>
          <p className="font-mono text-[11px] tracking-widest uppercase text-(--color-accent) mb-4">
            Ready?
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-4">
            Start tracking in<br />under a minute
          </h2>
          <p className="text-(--color-muted) text-sm sm:text-base mb-8 max-w-sm mx-auto">
            Connect your bank, set budgets, and see where your money actually goes.
          </p>
          <Link
            to="/login"
            className="btn-primary text-base px-8 py-3"
          >
            Get started free
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-(--color-border) py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="cents" className="h-4 w-auto opacity-50" />
            <span className="text-[11px] text-(--color-muted)">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-(--color-muted)">
            <span className="font-mono">v1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
