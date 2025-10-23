import { generateCategory } from "./generateCategory.js";

export const mapPlaidCategory = async (plaidCategoryArray = [], tx) => {
  if (!Array.isArray(plaidCategoryArray) || plaidCategoryArray.length === 0) {
    const result = await generateCategory(tx);
    return result.id;
  }

  const main = plaidCategoryArray[0]?.toLowerCase() || "";
  const sub = plaidCategoryArray[1]?.toLowerCase() || "";

  // Groceries
  if (
    sub.includes("grocery") ||
    sub.includes("supermarket") ||
    main.includes("groceries")
  )
    return 1;

  // Dining Out
  if (
    main.includes("food") ||
    sub.includes("restaurant") ||
    sub.includes("dining") ||
    sub.includes("bar")
  )
    return 2;

  // Transport (includes general travel/transportation and gas)
  if (
    main.includes("transportation") ||
    sub.includes("taxi") ||
    sub.includes("gas") ||
    main.includes("commute")
  )
    return 3;

  // Shopping
  if (
    main.includes("shopping") ||
    sub.includes("clothing") ||
    sub.includes("electronics") ||
    sub.includes("store") ||
    sub.includes("retail")
  )
    return 4;

  // Bills & Utilities
  if (
    main.includes("service") ||
    main.includes("utility") ||
    sub.includes("subscription") ||
    sub.includes("bill")
  )
    return 5;

  // Entertainment
  if (
    main.includes("entertainment") ||
    sub.includes("music") ||
    sub.includes("video") ||
    sub.includes("games") ||
    sub.includes("movie")
  )
    return 6;

  // Health
  if (
    main.includes("health") ||
    main.includes("medical") ||
    sub.includes("fitness") ||
    sub.includes("pharmacy") ||
    sub.includes("doctor")
  )
    return 7;

  // Income
  if (
    main.includes("income") ||
    main.includes("transfer") ||
    main.includes("refund") ||
    sub.includes("payroll") ||
    sub.includes("salary")
  )
    return 8;

  // Travel (Flights, hotels, trips)
  if (
    main.includes("travel") ||
    main.includes("trip") ||
    main.includes("vacation") ||
    sub.includes("flight") ||
    sub.includes("hotel") ||
    sub.includes("airline")
  )
    return 10; // if you add Travel as category ID 10

  // Default to "Other"
  return 9;
};
