import { eq } from "drizzle-orm";
import { db } from "../db/db.js";
import { transactions } from "../db/schema/transactions.js";
import { accounts } from "../db/schema/accounts.js";
import { categorizeTransaction } from "./mapCategory.js";

export const UpsertTransaction = async (tx) => {
  const {
    account_id: plaidAccountId,
    transaction_id: plaidTransactionId,
    name,
    amount,
    authorized_date: authorizedDate,
    date,
    payment_channel: paymentChannel,
    pending,
    merchant_name: merchantName,
  } = tx;

  // Resolve plaid account ID → internal UUID
  const [account] = await db
    .select({ id: accounts.id })
    .from(accounts)
    .where(eq(accounts.plaidAccountId, plaidAccountId))
    .limit(1);

  if (!account) {
    console.error(
      `[ERR] UpsertTransaction: No account found for plaid ID ${plaidAccountId}`,
    );
    return;
  }

  const { id: categoryId } = categorizeTransaction(tx);

  await db
    .insert(transactions)
    .values({
      accountId: account.id,
      plaidTransactionId,
      name,
      amount,
      date: authorizedDate || date,
      merchantName,
      paymentChannel,
      categoryId,
      pending,
    })
    .onConflictDoUpdate({
      target: transactions.plaidTransactionId,
      set: {
        accountId: account.id,
        amount,
        pending,
        categoryId,
        date,
        merchantName,
      },
    });
};
