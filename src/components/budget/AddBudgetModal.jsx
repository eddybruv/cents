import React from "react";
import { useBudget } from "../../hooks/useBudget";

const AddBudgetModal = ({ onClose }) => {
  const { addBudget } = useBudget();
  const [form, setForm] = React.useState({
    name: "",
    budget: "",
    color: "#6366f1",
    alertThreshold: 90,
  });
  const submit = (e) => {
    e.preventDefault();
    addBudget(form);
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
        <h2 className="text-sm font-semibold">New Budget</h2>
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
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBudgetModal;
