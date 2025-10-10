import React from "react";
import { useBudget } from "../../hooks/useBudget";
import Sparkline from "./Sparkline";

// A reusable module card for individual budget category deep-dive
const num = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n || 0);

const BudgetModule = ({ categoryKey }) => {
  const { budgets, spentByCategory, buildDaily, categoryColors, updateBudget } =
    useBudget();
  const b = budgets.find((x) => x.key === categoryKey);
  const [editing, setEditing] = React.useState(false);
  const [val, setVal] = React.useState(b ? b.budget : 0);
  if (!b) return null;
  const spent = spentByCategory[b.key] || 0;
  const remaining = Math.max(0, b.budget - spent);
  const pct = b.budget
    ? Math.min(100, Math.round((spent / b.budget) * 100))
    : 0;
  const line = buildDaily(b.name);
  const over = spent > b.budget;
  const save = () => {
    updateBudget(b.key, { budget: val });
    setEditing(false);
  };
  return (
    <div className="glass border border-(--color-border) rounded-md p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: categoryColors[b.key] }}
          />
          <h4 className="font-semibold text-sm">{b.name}</h4>
        </div>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="text-[10px] px-2 py-1 border border-(--color-border) rounded hover:border-(--color-accent)"
          >
            Edit
          </button>
        )}
      </div>
      <div className="grid grid-cols-4 gap-3 text-[11px]">
        <div>
          <p className="text-(--color-muted)">Budget</p>
          <p className="font-semibold">{num(b.budget)}</p>
        </div>
        <div>
          <p className="text-(--color-muted)">Spent</p>
          <p className="font-semibold">{num(spent)}</p>
        </div>
        <div>
          <p className="text-(--color-muted)">Remain</p>
          <p className="font-semibold">{num(remaining)}</p>
        </div>
        <div>
          <p className="text-(--color-muted)">Used</p>
          <p className={`font-semibold ${over ? "text-red-400" : ""}`}>
            {pct}%
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-40">
          <Sparkline points={line} color={categoryColors[b.key]} />
        </div>
        <div className="flex-1 h-2 bg-(--color-surface) rounded relative overflow-hidden">
          <div
            className="h-2 rounded"
            style={{
              width: `${pct}%`,
              background: over
                ? "linear-gradient(90deg,#ef4444,#f59e0b)"
                : categoryColors[b.key],
            }}
          />
          {over && (
            <div className="absolute inset-0 text-[9px] flex items-center justify-center text-red-300">
              OVER
            </div>
          )}
        </div>
      </div>
      {editing && (
        <div className="flex items-end gap-2 text-[11px]">
          <label className="flex flex-col gap-1">
            <span>New amount</span>
            <input
              type="number"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="px-2 py-1 rounded bg-(--color-surface) border border-(--color-border) w-28"
            />
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(false)}
              className="px-2 py-1 border border-(--color-border) rounded"
            >
              Cancel
            </button>
            <button
              onClick={save}
              className="px-2 py-1 bg-(--color-accent) text-black rounded font-semibold"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetModule;
