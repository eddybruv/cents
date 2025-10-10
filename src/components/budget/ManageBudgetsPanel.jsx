import React from "react";
import { useBudget } from "../../hooks/useBudget";

const ManageBudgetsPanel = () => {
  const { addBudget } = useBudget();
  const [form, setForm] = React.useState({ name: "", budget: "" });
  const submit = (e) => {
    e.preventDefault();
    addBudget({ name: form.name, budget: form.budget });
    setForm({ name: "", budget: "" });
  };
  return (
    <div className="glass border border-(--color-border) rounded-md p-4">
      <h3 className="font-semibold text-sm mb-3">Add budget</h3>
      <form onSubmit={submit} className="space-y-3 text-[11px]">
        <div className="flex flex-col gap-1">
          <label>Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="px-2 py-2 rounded-md bg-(--color-surface) border border-(--color-border)"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Amount</label>
          <input
            type="number"
            value={form.budget}
            onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
            className="px-2 py-2 rounded-md bg-(--color-surface) border border-(--color-border)"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-3 py-2 rounded-md bg-(--color-accent) text-black font-semibold"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default ManageBudgetsPanel;
