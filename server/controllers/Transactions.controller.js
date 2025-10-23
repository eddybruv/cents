import { desc, eq, gte, lte } from "drizzle-orm";
import { db } from "../db/db.js";
import { transactions } from "../db/schema/transactions.js";
import { institutions } from "../db/schema/institutions.js";
import { accounts } from "../db/schema/accounts.js";
import { categories } from "../db/schema/categories.js";
import { SyncTransactions } from "../helper/syncTransactions.js";

export const SyncPlaidTransactions = async (req, res) => {
  const { institutionId } = req.params;

  try {
    const institution = await db
      .select({ accessToken: institutions.accessToken })
      .from(institutions)
      .where(eq(institutions.id, institutionId));
    if (institution.length === 0) {
      return res.status(404).json({ error: "Institution not found" });
    }
    const accessToken = institution[0].accessToken;
    const synced = await SyncTransactions(accessToken, institutionId);

    if (!synced) {
      return res.status(500).json({ error: "Failed to sync transactions" });
    }
    res.json({ message: "Transactions synced successfully" });
  } catch (error) {
    console.error("❌ SyncPlaidTransactions:", error);
    res.status(500).json({ error: "Failed to sync transactions" });
  }
};

export const GetTransactions = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const allTransactions = await db
      .select({
        id: transactions.id,
        accountId: transactions.accountId,
        amount: transactions.amount,
        date: transactions.date,
        name: transactions.name,
        merchantName: transactions.merchantName,
        paymentChannel: transactions.paymentChannel,
        pending: transactions.pending,
        category: categories.name,
        institutionName: institutions.name,
        accountName: accounts.name,
      })
      .from(transactions)
      .innerJoin(accounts, eq(accounts.plaidAccountId, transactions.accountId))
      .innerJoin(institutions, eq(institutions.id, accounts.institutionId))
      .innerJoin(categories, eq(categories.id, transactions.categoryId))
      .where(eq(institutions.userId, userId))
      .orderBy(desc(transactions.date));

    res.json(allTransactions);
  } catch (error) {
    console.error("❌ GetTransactions:", error);
    res.status(500).json({ error: "Failed to retrieve transactions" });
  }
};

export const GetFilteredTransactions = async (req, res) => {
  const { startDate, endDate, categoryId, accountId } = req.query;
  const userId = req.user?.id;

  if (!userId) {
    console.error("❌ GetFilteredTransactions: Unauthorized access attempt");
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    let query = db
      .select({
        id: transactions.id,
        accountId: transactions.accountId,
        amount: transactions.amount,
        date: transactions.date,
        name: transactions.name,
        merchantName: transactions.merchantName,
        paymentChannel: transactions.paymentChannel,
        pending: transactions.pending,
        category: categories.name,
        institutionName: institutions.name,
        accountName: accounts.name,
      })
      .from(transactions)
      .innerJoin(accounts, eq(accounts.plaidAccountId, transactions.accountId))
      .innerJoin(institutions, eq(institutions.id, accounts.institutionId))
      .innerJoin(categories, eq(categories.id, transactions.categoryId))
      .where(eq(institutions.userId, userId))
      .orderBy(desc(transactions.date));

    if (startDate) {
      query = query.where(gte(transactions.date, startDate));
    }
    if (endDate) {
      query = query.where(lte(transactions.date, endDate));
    }
    if (categoryId) {
      query = query.where(eq(transactions.categoryId, categoryId));
    }
    if (accountId) {
      query = query.where(eq(transactions.accountId, accountId));
    }

    const filteredTransactions = await query;
    res.json(filteredTransactions);
  } catch (error) {
    console.error("❌ GetFilteredTransactions:", error);
    res.status(500).json({ error: "Failed to retrieve transactions" });
  }
};
