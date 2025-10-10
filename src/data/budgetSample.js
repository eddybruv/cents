// Budget sample data and month metadata for the dashboard
import moment from "moment";

export const categoryColors = {
  groceries: "#22c55e",
  dining: "#f59e0b",
  transport: "#3b82f6",
  utilities: "#a855f7",
  entertainment: "#ef4444",
  shopping: "#14b8a6",
  health: "#eab308",
  other: "#64748b",
};

export const budgets = [
  { key: "groceries", name: "Groceries", budget: 400 },
  { key: "dining", name: "Dining", budget: 180 },
  { key: "transport", name: "Transport", budget: 150 },
  { key: "utilities", name: "Utilities", budget: 220 },
  { key: "entertainment", name: "Entertainment", budget: 120 },
  { key: "shopping", name: "Shopping", budget: 250 },
  { key: "health", name: "Health", budget: 120 },
  { key: "other", name: "Other", budget: 100 },
];

const now = moment();
export const monthMeta = {
  year: now.year(),
  monthIndex: now.month(), // 0-11
  start: now.clone().startOf("month"),
  end: now.clone().endOf("month"),
  today: now,
};

export const daysInMonth = monthMeta.end.date();
export const elapsedDays = Math.min(daysInMonth, now.date());

// Dummy month-to-date spend by category (replace with real aggregation)
export const spentMTD = {
  groceries: 235,
  dining: 142,
  transport: 88,
  utilities: 96,
  entertainment: 64,
  shopping: 180,
  health: 40,
  other: 22,
};
