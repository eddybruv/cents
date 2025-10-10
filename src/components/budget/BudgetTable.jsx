import React from "react";
import { useBudget } from "../../hooks/useBudget.jsx";
import Sparkline from "./Sparkline.jsx";

const currency = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n || 0);

const BudgetRow = ({ b, onEdit, onDelete }) => {
  const { spentByCategory, categoryColors, buildDaily } = useBudget();
  const spent = spentByCategory[b.key] || 0;
  const remaining = Math.max(0, b.budget - spent);
  const pct = b.budget
    ? Math.min(100, Math.round((spent / b.budget) * 100))
    : 0;
  const line = buildDaily(b.name);
  const over = spent > b.budget;
  const near = !over && pct >= (b.alertThreshold || 90);
  const color = b.color || categoryColors[b.key] || "var(--color-accent)";
  return (
    <tr className="border-t border-(--color-border) align-top">
      <td className="py-3 pr-3">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: color }}
          />
          <span className="font-medium text-sm">{b.name}</span>
        </div>
      </td>
      <td className="py-3 pr-3 text-sm">{currency(b.budget)}</td>
      <td className="py-3 pr-3 text-sm">{currency(spent)}</td>
      <td className="py-3 pr-3 text-sm">{currency(remaining)}</td>
      <td className="py-3 pr-3 text-sm">
        <div className="w-28">
          <Sparkline points={line} color={color} />
        </div>
      </td>
      <td className="py-3 pr-3 text-sm">
        <div className="h-2 bg-(--color-surface) rounded w-40 relative overflow-hidden">
          <div
            className="h-2 rounded"
            style={{
              width: `${pct}%`,
              background: over
                ? "linear-gradient(90deg,#ef4444,#f59e0b)"
                : color,
            }}
          />
          {over && (
            <div className="absolute inset-0 animate-pulse text-[10px] flex items-center justify-center text-red-200">
              OVER
            </div>
          )}
          {near && !over && (
            <div className="absolute inset-0 text-[9px] flex items-center justify-center text-amber-300 bg-amber-500/10">
              NEAR
            </div>
          )}
        </div>
      </td>
      <td className="py-3 pr-3 text-xs flex gap-2">
        <button
          onClick={() => onEdit(b)}
          className="px-2 py-1 border border-(--color-border) rounded hover:border-(--color-accent)"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(b)}
          className="px-2 py-1 border border-red-500 text-red-400 rounded hover:bg-red-500/10"
        >
          Del
        </button>
      </td>
    </tr>
  );
};

const BudgetTable = () => {
  const { budgets, deleteBudget } = useBudget();
  const [editing, setEditing] = React.useState(null);
  return (
    <div className="glass border border-(--color-border) rounded-md p-4 overflow-x-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">Budgets</h3>
      </div>
      <table className="w-full text-xs border-collapse min-w-[820px]">
        <thead>
          <tr className="text-(--color-muted)">
            <th className="text-left font-medium pb-2 pr-3">Category</th>
            <th className="text-left font-medium pb-2 pr-3">Budget</th>
            <th className="text-left font-medium pb-2 pr-3">Spent</th>
            <th className="text-left font-medium pb-2 pr-3">Remaining</th>
            <th className="text-left font-medium pb-2 pr-3">Trend</th>
            <th className="text-left font-medium pb-2 pr-3">Progress</th>
            <th className="text-left font-medium pb-2 pr-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((b) => (
            <BudgetRow
              key={b.key}
              b={b}
              onEdit={setEditing}
              onDelete={(bud) => deleteBudget(bud.key)}
            />
          ))}
        </tbody>
      </table>
      {editing && (
        <EditBudgetModal budget={editing} onClose={() => setEditing(null)} />
      )}
    </div>
  );
};

const EditBudgetModal = ({ budget, onClose }) => {
  const { updateBudget } = useBudget();
  const [form, setForm] = React.useState({
    name: budget.name,
    budget: budget.budget,
    color: budget.color || "",
    alertThreshold: budget.alertThreshold || 90,
  });
  const submit = (e) => {
    e.preventDefault();
    updateBudget(budget.key, { ...form });
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <form
        onSubmit={submit}
        className="relative z-10 w-full max-w-sm glass border border-(--color-border) rounded-lg p-5 space-y-4"
      >
        <h2 className="text-sm font-semibold">Edit Budget</h2>
        <label className="text-[11px] space-y-1 w-full block">
          <span>Name</span>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full px-2 py-2 rounded-md bg-(--color-surface) border border-(--color-border)"
            required
          />
        </label>
        <label className="text-[11px] space-y-1 w-full block">
          <span>Amount</span>
          <input
            type="number"
            value={form.budget}
            onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
            className="w-full px-2 py-2 rounded-md bg-(--color-surface) border border-(--color-border)"
            required
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-[11px] space-y-1 w-full block">
            <span>Color</span>
            <input
              type="color"
              value={form.color}
              onChange={(e) =>
                setForm((f) => ({ ...f, color: e.target.value }))
              }
              className="w-full h-9 px-2 py-1 rounded-md bg-(--color-surface) border border-(--color-border)"
            />
          </label>
          <label className="text-[11px] space-y-1 w-full block">
            <span>Alert %</span>
            <input
              type="number"
              value={form.alertThreshold}
              onChange={(e) =>
                setForm((f) => ({ ...f, alertThreshold: e.target.value }))
              }
              className="w-full px-2 py-2 rounded-md bg-(--color-surface) border border-(--color-border)"
            />
          </label>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-xs rounded-md border border-(--color-border)"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-2 text-xs rounded-md bg-(--color-accent) text-black font-semibold"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetTable;
