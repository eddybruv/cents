import { db } from "../db/db.js";
import { transactions } from "../db/schema/transactions.js";
import { mapPlaidCategory } from "./mapCategory.js";

export const UpsertTransaction = async (tx) => {
  // Find category or insert if new
  let {
    account_id: accountId,
    transaction_id: plaidTransactionId,
    name,
    amount,
    authorized_date: date,
    category,
    payment_channel: paymentChannel,
    pending,
    merchant_name: merchantName,
  } = tx;

  const categoryId = await mapPlaidCategory(category, tx);


  // Upsert transaction
  await db
    .insert(transactions)
    .values({
      accountId,
      plaidTransactionId,
      name,
      amount,
      date,
      merchantName,
      paymentChannel,
      categoryId,
      pending,
    })
    .onConflictDoUpdate({
      target: transactions.plaidTransactionId,
      set: {
        amount,
        pending,
        categoryId,
        date,
        merchantName,
      },
    });
};
