import React from "react";
import PropTypes from "prop-types";
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

function KPI({ title, value, sub, accent }) {
  return (
    <div className="card p-4 rounded-xl group">
      <p className="text-[11px] font-medium uppercase tracking-wider text-(--color-muted) mb-2">
        {title}
      </p>
      <p
        className="text-xl font-bold tracking-tight tabular-nums"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </p>
      {sub ? <div className="mt-1.5">{sub}</div> : null}
    </div>
  );
}

KPI.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sub: PropTypes.node,
  accent: PropTypes.string,
};

const BudgetHeader = () => {
  const totalBudget = budgets.reduce((s, b) => s + (b.budget || 0), 0);
  const totalSpent = Object.values(spentMTD).reduce((s, v) => s + (v || 0), 0);
  const remaining = Math.max(0, totalBudget - totalSpent);

  const spendRate = totalBudget ? totalSpent / totalBudget : 0;
  const timeRate = daysInMonth ? elapsedDays / daysInMonth : 0;
  const pace = spendRate - timeRate;

  const paceLabel =
    pace > 0.05 ? "Over pace" : pace < -0.05 ? "Under pace" : "On pace";
  const paceColor =
    pace > 0.05
      ? "text-red-400"
      : pace < -0.05
        ? "text-emerald-400"
        : "text-(--color-muted)";

  return (
    <section className="animate-in stagger-2 grid grid-cols-2 lg:grid-cols-4 gap-3">
      <KPI title="Monthly budget" value={currency(totalBudget)} />
      <KPI title="Spent MTD" value={currency(totalSpent)} />
      <KPI title="Remaining" value={currency(remaining)} accent={remaining > 0 ? "var(--color-accent)" : undefined} />
      <KPI
        title={`Pacing \u00b7 ${elapsedDays}/${daysInMonth}d`}
        value={`${Math.round(spendRate * 100)}%`}
        sub={
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium ${paceColor}`}>{paceLabel}</span>
            <div className="flex-1 h-1 rounded-full bg-(--color-surface-elevated) overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.round(spendRate * 100))}%`,
                  background: pace > 0.05 ? "#f87171" : "var(--color-accent)",
                }}
              />
            </div>
          </div>
        }
      />
    </section>
  );
};

export default BudgetHeader;
