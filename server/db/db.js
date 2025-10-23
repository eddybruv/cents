/* eslint-disable no-undef */
import { accounts } from "./schema/accounts.js";
import { categories } from "./schema/categories.js";
import { transactions } from "./schema/transactions.js";
import { budgets } from "./schema/budgets.js";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";
import { sql } from "drizzle-orm";

const schema = { accounts, categories, transactions, budgets };

const connectionString = process.env.DATABASE_URL;

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });

(async () => {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("🤝✅ Database connection is live!");
  } catch (error) {
    console.error("👎🏾 Database connection failed:", error);
  }
})();
