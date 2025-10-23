import { eq } from "drizzle-orm";
import { db } from "../db/db.js";
import { transactions } from "../db/schema/transactions.js";

export const deleteTransaction = async (plaidTransactionId) => {
  try {
    await db
      .delete(transactions)
      .where(eq(transactions.plaidTransactionId, plaidTransactionId));
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
};
