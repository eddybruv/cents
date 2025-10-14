import { pgTable, uuid, text, numeric, date, timestamp, integer } from 'drizzle-orm/pg-core';
import { users } from './users.js';
import { categories } from './categories.js';

export const budgets = pgTable('budgets', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id').references(() => categories.id),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  period: text('period').default('monthly').notNull(),
  startDate: date('start_date').defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});