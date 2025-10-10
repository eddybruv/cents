// BudgetProvider component (context separated for fast refresh)
import React, { useMemo, useState } from "react";
import {
  budgets as initialBudgets,
  spentMTD as initialSpent,
  daysInMonth,
  elapsedDays,
  categoryColors,
} from "../data/budgetSample";
import { spendingByDay } from "../data/spendingSample";
import { BudgetContext } from "./BudgetContextCore";

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function BudgetProvider({ children }) {
  const [budgets, setBudgets] = useState(initialBudgets);
  const [spentByCategory, setSpentByCategory] = useState(initialSpent);

  const addBudget = ({ name, budget, color, alertThreshold }) => {
    if (!name || !budget) return;
    const key = slugify(name);
    if (budgets.some((b) => b.key === key)) return;
    setBudgets((prev) => [
      ...prev,
      {
        key,
        name,
        budget: Number(budget),
        color: color || "#6366f1",
        alertThreshold: alertThreshold ? Number(alertThreshold) : 90,
      },
    ]);
  };

  const updateBudget = (key, patch) =>
    setBudgets((prev) =>
      prev.map((b) =>
        b.key === key
          ? {
              ...b,
              ...patch,
              budget:
                patch.budget !== undefined ? Number(patch.budget) : b.budget,
              alertThreshold:
                patch.alertThreshold !== undefined
                  ? Number(patch.alertThreshold)
                  : b.alertThreshold,
            }
          : b,
      ),
    );

  const deleteBudget = (key) =>
    setBudgets((prev) => prev.filter((b) => b.key !== key));

  const setSpentForCategory = (key, value) =>
    setSpentByCategory((prev) => ({ ...prev, [key]: Number(value) || 0 }));

  const totalBudget = useMemo(
    () => budgets.reduce((s, b) => s + (b.budget || 0), 0),
    [budgets],
  );
  const totalSpent = useMemo(
    () => Object.values(spentByCategory).reduce((s, v) => s + (v || 0), 0),
    [spentByCategory],
  );

  // Sparkline helper (duplicated from page earlier)
  const buildDaily = (categoryName) => {
    const rows = spendingByDay
      .filter((r) => r.category.toLowerCase() === categoryName.toLowerCase())
      .sort((a, b) => a.date.localeCompare(b.date));
    let run = 0;
    return rows.map((r) => {
      run += r.amount;
      return { date: r.date, total: run };
    });
  };

  const value = {
    budgets,
    spentByCategory,
    daysInMonth,
    elapsedDays,
    categoryColors,
    totalBudget,
    totalSpent,
    remaining: Math.max(0, totalBudget - totalSpent),
    addBudget,
    updateBudget,
    deleteBudget,
    setSpentForCategory,
    buildDaily,
  };

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
}
