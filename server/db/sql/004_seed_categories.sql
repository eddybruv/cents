-- Seed baseline categories
-- Safe to run multiple times.

INSERT INTO categories (name, description, color)
VALUES
  ('Groceries', 'Supermarkets, food stores', '#22C55E'),
  ('Dining Out', 'Restaurants, cafes, bars', '#F97316'),
  ('Transport', 'Gas, public transit, taxis', '#3B82F6'),
  ('Shopping', 'Clothing, retail, online stores', '#A855F7'),
  ('Bills & Utilities', 'Subscriptions, electricity, water', '#64748B'),
  ('Entertainment', 'Movies, streaming, games', '#EC4899'),
  ('Health', 'Fitness, medical, pharmacy', '#14B8A6'),
  ('Income', 'Salary, refunds, transfers in', '#10B981'),
  ('Other', 'Uncategorized', '#94A3B8'),
  ('Travel', 'Flights, hotels, car rentals', '#EAB308')
ON CONFLICT (name)
DO UPDATE
SET
  description = EXCLUDED.description,
  color = EXCLUDED.color;
