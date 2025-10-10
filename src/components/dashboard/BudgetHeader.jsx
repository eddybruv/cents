import React from "react";
import {
  budgets,
  spentMTD,
  daysInMonth,
  elapsedDays,
} from "../../data/budgetSample";

const currency = (n) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n ?? 0);

function KPI({ title, value, sub }) {
  return (
    <div className="glass rounded-md border border-(--color-border) p-4">
      <p className="text-xs text-(--color-muted)">{title}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
      {sub ? <div className="mt-1">{sub}</div> : null}
    </div>
  );
}

const BudgetHeader = () => {
  const totalBudget = budgets.reduce((s, b) => s + (b.budget || 0), 0);
  const totalSpent = Object.values(spentMTD).reduce((s, v) => s + (v || 0), 0);
  const remaining = Math.max(0, totalBudget - totalSpent);

  const spendRate = totalBudget ? totalSpent / totalBudget : 0; // % budget used
  const timeRate = daysInMonth ? elapsedDays / daysInMonth : 0; // % time elapsed
  const pace = spendRate - timeRate; // >0 behind (overspending), <0 ahead

  const paceLabel =
    pace > 0.05 ? "Over pace" : pace < -0.05 ? "Under pace" : "On pace";
  const paceColor =
    pace > 0.05
      ? "text-red-500"
      : pace < -0.05
        ? "text-emerald-500"
        : "text-(--color-muted)";

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <KPI title="Monthly budget" value={currency(totalBudget)} />
      <KPI title="Spent (MTD)" value={currency(totalSpent)} />
      <KPI title="Remaining" value={currency(remaining)} />
      <KPI
        title={`Pacing (${elapsedDays}/${daysInMonth} days)`}
        value={`${Math.round(spendRate * 100)}%`}
        sub={<span className={`text-xs ${paceColor}`}>{paceLabel}</span>}
      />
    </section>
  );
};

export default BudgetHeader;
