import { eq } from "drizzle-orm";
import { institutions } from "../db/schema/institutions.js";
import { UpsertTransaction } from "./upsertTransaction.js";
import { db } from "../db/db.js";
import plaidClient from "../services/plaidConfig.js";
import { deleteTransaction } from "./deleteTransaction.js";

export const SyncTransactions = async (accessToken, institutionId) => {
  try {
    let added = [];
    let modified = [];
    let removed = [];

    let dbResponse = await db
      .select({ cursor: institutions.transactionCursor })
      .from(institutions)
      .where(eq(institutions.id, institutionId));

    let cursor = dbResponse[0]?.cursor || null;

    let hasMore = true;

    while (hasMore) {
      const { data } = await plaidClient.transactionsSync({
        access_token: accessToken,
        cursor,
      });

      added = added.concat(data.added);
      modified = modified.concat(data.modified);
      removed = removed.concat(data.removed);

      hasMore = data.has_more;

      cursor = data.next_cursor;
    }

    await db
      .update(institutions)
      .set({ transactionCursor: cursor })
      .where(eq(institutions.id, institutionId));

    await Promise.all(
      added.map(async (tx) => {
        await UpsertTransaction(tx);
      }),
    );

    // update modified
    await Promise.all(
      modified.map(async (tx) => {
        await UpsertTransaction(tx);
      }),
    );

    // delete removed
    await Promise.all(
      removed.map(async (plaidTransactionId) => {
        await deleteTransaction(plaidTransactionId);
      }),
    );

    console.log("✅ SyncTransactions completed");
    return {
      synced: true,
      added: added.length,
      modified: modified.length,
      removed: removed.length,
    };
  } catch (error) {
    console.error(
      "❌ SyncTransactions:",
      error?.response?.data || error.message,
    );

    await db
      .update(institutions)
      .set({ transactionCursor: null })
      .where(eq(institutions.id, institutionId));

    return { synced: false, added: 0, modified: 0, removed: 0 };
  }
};
