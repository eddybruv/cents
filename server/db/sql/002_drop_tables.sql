-- Cents database teardown (PostgreSQL)
-- Drops tables in reverse dependency order.

DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS institutions;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
