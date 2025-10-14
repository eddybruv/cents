import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').unique().notNull(),
  parentId: integer('parent_id').references(() => categories.id),
});