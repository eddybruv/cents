import moment from "moment";

// Sample transaction dataset
export const transactions = [
  { id: 1, date: "2025-07-29", category: "Groceries", merchant: "Trader Joe's", amount: 47.26, account: "Visa" },
  { id: 2, date: "2025-07-29", category: "Dining", merchant: "Pizzeria", amount: 28.0, account: "Visa" },
  { id: 3, date: "2025-07-28", category: "Health", merchant: "Clinic", amount: 75.0, account: "HSA" },
  { id: 4, date: "2025-07-27", category: "Shopping", merchant: "Best Buy", amount: 329.99, account: "Mastercard" },
  { id: 5, date: "2025-07-26", category: "Transport", merchant: "Uber", amount: 22.1, account: "Visa" },
  { id: 6, date: "2025-07-25", category: "Entertainment", merchant: "Spotify", amount: 9.99, account: "Visa" },
  { id: 7, date: "2025-07-24", category: "Groceries", merchant: "Costco", amount: 135.4, account: "Visa" },
  { id: 8, date: "2025-07-23", category: "Dining", merchant: "Cafe", amount: 9.7, account: "Visa" },
  { id: 9, date: "2025-07-22", category: "Bills", merchant: "Internet Co.", amount: 60.0, account: "Checking" },
  { id: 10, date: "2025-07-21", category: "Groceries", merchant: "Whole Foods", amount: 72.64, account: "Visa" },
  { id: 11, date: "2025-07-20", category: "Dining", merchant: "Steakhouse", amount: 64.2, account: "Visa" },
  { id: 12, date: "2025-07-19", category: "Transport", merchant: "Subway", amount: 6.5, account: "Transit" },
];

export const createTransaction = (overrides = {}) => ({
  id: Date.now(),
  date: moment().format("YYYY-MM-DD"),
  category: "Other",
  merchant: "New",
  amount: 0,
  account: "Unassigned",
  ...overrides,
});
