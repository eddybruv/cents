import { desc, eq, gte, lte } from "drizzle-orm";
import { db } from "../db/db.js";
import { transactions } from "../db/schema/transactions.js";
import { institutions } from "../db/schema/institutions.js";
import { accounts } from "../db/schema/accounts.js";
import { categories } from "../db/schema/categories.js";
import { SyncTransactions } from "../helper/syncTransactions.js";
import { ApiError } from "../lib/ApiError.js";

export const SyncPlaidTransactions = async (req, res, next) => {
  const { institutionId } = req.params;

  try {
    const institution = await db
      .select({ accessToken: institutions.accessToken })
      .from(institutions)
      .where(eq(institutions.id, institutionId));

    if (institution.length === 0) {
      throw ApiError.notFound("Institution not found");
    }

    const { synced, added, modified, removed } = await SyncTransactions(
      institution[0].accessToken,
      institutionId,
    );

    if (!synced) {
      throw ApiError.internal("Transaction sync failed — cursor has been reset");
    }

    res.json({ message: "Transactions synced successfully", added, modified, removed });
  } catch (error) {
    next(error);
  }
};

export const GetTransactions = async (req, res, next) => {
  const userId = req.user?.id;
  if (!userId) return next(ApiError.unauthorized());

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
        userDescription: transactions.userDescription,
        categoryId: transactions.categoryId,
        category: categories.name,
        institutionName: institutions.name,
        accountName: accounts.name,
      })
      .from(transactions)
      .innerJoin(accounts, eq(accounts.id, transactions.accountId))
      .innerJoin(institutions, eq(institutions.id, accounts.institutionId))
      .innerJoin(categories, eq(categories.id, transactions.categoryId))
      .where(eq(institutions.userId, userId))
      .orderBy(desc(transactions.date));

    res.json(allTransactions);
  } catch (error) {
    next(error);
  }
};

export const UpdateTransaction = async (req, res, next) => {
  const { id } = req.params;
  const { userDescription, categoryId } = req.body;
  const userId = req.user?.id;
  if (!userId) return next(ApiError.unauthorized());

  try {
    const existing = await db
      .select({ id: transactions.id })
      .from(transactions)
      .innerJoin(accounts, eq(accounts.id, transactions.accountId))
      .innerJoin(institutions, eq(institutions.id, accounts.institutionId))
      .where(eq(transactions.id, id))
      .where(eq(institutions.userId, userId));

    if (!existing.length) {
      throw ApiError.notFound("Transaction not found");
    }

    const patch = {};
    if (userDescription !== undefined) patch.userDescription = userDescription;
    if (categoryId !== undefined) patch.categoryId = Number(categoryId);

    const [updated] = await db
      .update(transactions)
      .set(patch)
      .where(eq(transactions.id, id))
      .returning();

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const GetFilteredTransactions = async (req, res, next) => {
  const { startDate, endDate, categoryId, accountId } = req.query;
  const userId = req.user?.id;
  if (!userId) return next(ApiError.unauthorized());

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
      .innerJoin(accounts, eq(accounts.id, transactions.accountId))
      .innerJoin(institutions, eq(institutions.id, accounts.institutionId))
      .innerJoin(categories, eq(categories.id, transactions.categoryId))
      .where(eq(institutions.userId, userId))
      .orderBy(desc(transactions.date));

    if (startDate) query = query.where(gte(transactions.date, startDate));
    if (endDate) query = query.where(lte(transactions.date, endDate));
    if (categoryId) query = query.where(eq(transactions.categoryId, categoryId));
    if (accountId) query = query.where(eq(transactions.accountId, accountId));

    const filteredTransactions = await query;
    res.json(filteredTransactions);
  } catch (error) {
    next(error);
  }
};
