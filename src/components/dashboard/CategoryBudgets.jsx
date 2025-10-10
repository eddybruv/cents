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
    <section className="glass rounded-md border border-(--color-border) p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold">Category budgets</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {budgets.map((b) => {
          const spent = spentMTD[b.key] ?? 0;
          const pct = b.budget
            ? Math.min(100, Math.round((spent / b.budget) * 100))
            : 0;
          const over = spent > b.budget;
          return (
            <div
              key={b.key}
              className="border border-(--color-border) rounded-md p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{
                      background: categoryColors[b.key] || "var(--color-fg)",
                    }}
                  />
                  <p className="text-sm font-medium">{b.name}</p>
                </div>
                <p
                  className={`text-xs ${over ? "text-red-500" : "text-(--color-muted)"}`}
                >
                  {currency(spent)} / {currency(b.budget)}
                </p>
              </div>
              <div className="h-2 w-full rounded bg-(--color-surface)">
                <div
                  className="h-2 rounded transition-all"
                  style={{
                    width: `${pct}%`,
                    background: over
                      ? "linear-gradient(90deg,#ef4444,#f59e0b)"
                      : categoryColors[b.key],
                  }}
                />
              </div>
              <div className="mt-1 text-[11px] text-(--color-muted)">
                {over ? "Over budget" : `${100 - pct}% remaining`}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryBudgets;
