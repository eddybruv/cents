import React from "react";
import { budgets, spentMTD, categoryColors } from "../../data/budgetSample";

const currency = (n) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n ?? 0);

const CategoryBudgets = () => {
  return (
    <section className="animate-in stagger-5 card p-5 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold tracking-tight">Category budgets</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {budgets.map((b) => {
          const spent = spentMTD[b.key] ?? 0;
          const pct = b.budget
            ? Math.min(100, Math.round((spent / b.budget) * 100))
            : 0;
          const over = spent > b.budget;
          const color = categoryColors[b.key] || "var(--color-fg)";

          return (
            <div
              key={b.key}
              className="rounded-lg p-3.5 transition-all duration-200 hover:bg-(--color-surface-elevated) group"
              style={{
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full transition-transform duration-200 group-hover:scale-125"
                    style={{ background: color }}
                  />
                  <p className="text-sm font-medium">{b.name}</p>
                </div>
                <p
                  className={`text-xs tabular-nums ${over ? "text-red-400 font-medium" : "text-(--color-muted)"}`}
                >
                  {currency(spent)}{" "}
                  <span className="text-(--color-muted)">/ {currency(b.budget)}</span>
                </p>
              </div>
              <div className="h-1.5 w-full rounded-full bg-(--color-surface-elevated) overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${pct}%`,
                    background: over
                      ? "linear-gradient(90deg, #f87171, #fbbf24)"
                      : color,
                  }}
                />
              </div>
              <div className="mt-1.5 text-[11px] text-(--color-muted)">
                {over ? (
                  <span className="text-red-400">Over budget</span>
                ) : (
                  `${100 - pct}% remaining`
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryBudgets;
