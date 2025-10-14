import { pgTable, uuid, text, numeric, date, boolean, jsonb, timestamp, integer } from 'drizzle-orm/pg-core';
import { accounts } from './accounts.js';
import { categories } from './categories.js';

export const transactions = pgTable('transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  accountId: uuid('account_id').references(() => accounts.id, { onDelete: 'cascade' }),
  plaidTransactionId: text('plaid_transaction_id').unique().notNull(),
  name: text('name').notNull(),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  date: date('date').notNull(),
  categoryId: integer('category_id').references(() => categories.id),
  merchantName: text('merchant_name'),
  paymentChannel: text('payment_channel'),
  pending: boolean('pending').default(false),
  raw: jsonb('raw'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});