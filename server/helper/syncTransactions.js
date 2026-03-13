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

    await Promise.all(added.map((tx) => UpsertTransaction(tx)));
    await Promise.all(modified.map((tx) => UpsertTransaction(tx)));
    await Promise.all(removed.map((id) => deleteTransaction(id)));

    console.log(
      `[OK] SyncTransactions: +${added.length} ~${modified.length} -${removed.length}`,
    );
    return {
      synced: true,
      added: added.length,
      modified: modified.length,
      removed: removed.length,
    };
  } catch (error) {
    console.error(
      `[ERR] SyncTransactions: ${error?.response?.data?.error_message || error.message}`,
    );

    // Reset cursor so next sync starts fresh
    await db
      .update(institutions)
      .set({ transactionCursor: null })
      .where(eq(institutions.id, institutionId));

    return { synced: false, added: 0, modified: 0, removed: 0 };
  }
};
