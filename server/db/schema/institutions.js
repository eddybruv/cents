import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.js";

export const institutions = pgTable("institutions", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  plaidInstitutionId: text("plaid_institution_id").notNull(),
  uniqueId: text("unique_id").unique().notNull(),
  name: text("name").notNull(),
  accessToken: text("access_token").notNull(),
  transactionCursor: text("transaction_cursor").unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
