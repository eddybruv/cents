import { pgTable, uuid, text, numeric, timestamp } from 'drizzle-orm/pg-core';
import { institutions } from './institutions.js';

export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  institutionId: uuid('institution_id').references(() => institutions.id, { onDelete: 'cascade' }),
  plaidAccountId: text('plaid_account_id').unique().notNull(),
  name: text('name').notNull(),
  type: text('type'),
  subtype: text('subtype'),
  mask: text('mask'),
  balanceAvailable: numeric('balance_available', { precision: 12, scale: 2 }),
  balanceCurrent: numeric('balance_current', { precision: 12, scale: 2 }),
  currencyCode: text('currency_code').default('CAD'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});