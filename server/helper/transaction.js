import { eq } from "drizzle-orm";
import { categories } from "../db/schema/categories";
import { db } from "../db/db";
import { accounts } from "../db/schema/accounts";
import { transactions } from "../db/schema/transactions";

export const UpsertTransaction = async (tx, institutionId) => {
  // Find category or insert if new
  let {
    account_id: accountId,
    transaction_id: plaidTransactionId,
    name,
    amount,
    authorized_date: date,
    category_id: categoryId,
    category,
    payment_channel: paymentChannel,
    pending,
    merchant_name: merchantName,
  } = tx;

  if (categoryId || category?.length) {
    const main = category?.[0] || null;
    const sub = category?.[1] || null;
    const plaidCatId = categoryId || `${main}-${sub}`;

    const [existing] = await db
      .select()
      .from(categories)
      .where(eq(categories.plaidCategoryId, plaidCatId));

    if (existing) {
      categoryId = existing.id;
    } else {
      const [inserted] = await db
        .insert(categories)
        .values({
          plaidCategoryId: plaidCatId,
          plaidCategory: main,
          plaidSubcategory: sub,
        })
        .returning({ id: categories.id });
      categoryId = inserted.id;
    }
  }

  // Find account by plaid_account_id
  const [account] = await db
    .select()
    .from(accounts)
    .where(eq(accounts.plaidAccountId, tx.account_id));
  if (!account) return;

  // Upsert transaction
  await db
    .insert(transactions)
    .values({
      plaidTransactionId: tx.transaction_id,
      accountId: account.id,
      categoryId,
      name: tx.name,
      amount: tx.amount,
      isoCurrencyCode: tx.iso_currency_code,
      date: tx.date,
      pending: tx.pending,
      merchantName: tx.merchant_name || null,
    })
    .onConflictDoUpdate({
      target: transactions.plaidTransactionId,
      set: {
        amount: tx.amount,
        pending: tx.pending,
        categoryId,
        date: tx.date,
        merchantName: tx.merchant_name || null,
      },
    });
};
