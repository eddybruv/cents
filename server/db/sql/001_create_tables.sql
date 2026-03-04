-- Cents database schema (PostgreSQL)
-- Creates tables and relations used by the server layer.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY,
  email text NOT NULL UNIQUE,
  full_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS categories (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  color text
);

CREATE TABLE IF NOT EXISTS institutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  plaid_institution_id text NOT NULL,
  unique_id text NOT NULL UNIQUE,
  name text NOT NULL,
  access_token text NOT NULL,
  transaction_cursor text UNIQUE,
  logo text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT institutions_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid,
  plaid_account_id text NOT NULL UNIQUE,
  name text NOT NULL,
  type text,
  subtype text,
  mask text,
  type_mask_unique text NOT NULL UNIQUE,
  balance_available numeric(12, 2),
  balance_current numeric(12, 2),
  currency_code text DEFAULT 'CAD',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT accounts_institution_id_fkey
    FOREIGN KEY (institution_id)
    REFERENCES institutions(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id text,
  plaid_transaction_id text NOT NULL UNIQUE,
  name text NOT NULL,
  amount numeric(12, 2) NOT NULL,
  date date NOT NULL,
  category_id integer,
  merchant_name text,
  payment_channel text,
  pending boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT transactions_account_id_fkey
    FOREIGN KEY (account_id)
    REFERENCES accounts(plaid_account_id)
    ON DELETE CASCADE,
  CONSTRAINT transactions_category_id_fkey
    FOREIGN KEY (category_id)
    REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS budgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  category_id integer,
  amount numeric(12, 2) NOT NULL,
  period text NOT NULL DEFAULT 'monthly',
  start_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT budgets_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
  CONSTRAINT budgets_category_id_fkey
    FOREIGN KEY (category_id)
    REFERENCES categories(id)
);

CREATE INDEX IF NOT EXISTS idx_institutions_user_id ON institutions(user_id);
CREATE INDEX IF NOT EXISTS idx_accounts_institution_id ON accounts(institution_id);
CREATE INDEX IF NOT EXISTS idx_transactions_account_id ON transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_transactions_category_id ON transactions(category_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_budgets_user_id ON budgets(user_id);
CREATE INDEX IF NOT EXISTS idx_budgets_category_id ON budgets(category_id);
