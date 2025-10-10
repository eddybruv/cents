import React from "react";
import { useBudget } from "../../hooks/useBudget";

const currencyFull = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n || 0,
  );

const Allocation = () => {
  const { budgets, spentByCategory, totalBudget, totalSpent, categoryColors } =
    useBudget();
  return (
    <div className="glass border border-(--color-border) rounded-md p-4">
      <h3 className="font-semibold mb-3 text-sm">Allocation</h3>
      <div className="space-y-2">
        {budgets.map((b) => {
          const share = b.budget / totalBudget;
          const spent = spentByCategory[b.key] || 0;
          const pctSpent = spent / b.budget;
          return (
            <div key={b.key} className="text-xs">
              <div className="flex justify-between mb-1">
                <span className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: categoryColors[b.key] }}
                  />{" "}
                  {b.name}
                </span>
                <span>{Math.round(share * 100)}%</span>
              </div>
              <div className="h-2 rounded bg-(--color-surface) relative overflow-hidden">
                <div
                  className="h-2 rounded-l"
                  style={{
                    width: `${Math.min(100, pctSpent * 100)}%`,
                    background: categoryColors[b.key],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
        <div>
          <p className="text-(--color-muted)">Budget</p>
          <p className="font-semibold">{currencyFull(totalBudget)}</p>
        </div>
        <div>
          <p className="text-(--color-muted)">Spent</p>
          <p className="font-semibold">{currencyFull(totalSpent)}</p>
        </div>
        <div>
          <p className="text-(--color-muted)">Remaining</p>
          <p className="font-semibold">
            {currencyFull(Math.max(0, totalBudget - totalSpent))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Allocation;
