-- Migration: Switch to persistent_account_id for stable account identity
-- and change transactions.account_id to reference accounts.id (UUID) instead
-- of the mutable plaid_account_id.
--
-- Run this in your Supabase SQL editor.
-- ⚠️  Back up your data before running.

BEGIN;

-- 1. Add persistent_account_id column to accounts
ALTER TABLE accounts
  ADD COLUMN IF NOT EXISTS persistent_account_id text;

-- 2. Backfill existing rows — use plaid_account_id as initial value
--    (will be replaced with real persistent IDs on next Plaid sync)
UPDATE accounts
SET persistent_account_id = plaid_account_id
WHERE persistent_account_id IS NULL;

-- 3. Make it NOT NULL and UNIQUE
ALTER TABLE accounts
  ALTER COLUMN persistent_account_id SET NOT NULL;

ALTER TABLE accounts
  ADD CONSTRAINT accounts_persistent_account_id_unique
  UNIQUE (persistent_account_id);

-- 4. Add user_description column to transactions if missing
--    (referenced in schema but may not exist in DB)
ALTER TABLE transactions
  ADD COLUMN IF NOT EXISTS user_description text;

-- 5. Repoint transactions.account_id from plaid text IDs → internal UUIDs
--    Drop the old FK first
ALTER TABLE transactions
  DROP CONSTRAINT IF EXISTS transactions_account_id_fkey;

-- Update existing rows: resolve plaid_account_id → accounts.id (UUID)
UPDATE transactions t
SET account_id = a.id::text
FROM accounts a
WHERE t.account_id = a.plaid_account_id;

-- 6. Change column type to UUID now that data is correct
ALTER TABLE transactions
  ALTER COLUMN account_id TYPE uuid USING account_id::uuid;

-- 7. Re-add FK pointing to accounts.id
ALTER TABLE transactions
  ADD CONSTRAINT transactions_account_id_fkey
  FOREIGN KEY (account_id)
  REFERENCES accounts(id)
  ON DELETE CASCADE;

-- 8. Recreate the index on the updated column
DROP INDEX IF EXISTS idx_transactions_account_id;
CREATE INDEX idx_transactions_account_id ON transactions(account_id);

-- 9. (Optional) Drop type_mask_unique constraint — no longer used as conflict target.
--    Keep the column for backwards compatibility but remove the unique constraint.
ALTER TABLE accounts
  DROP CONSTRAINT IF EXISTS accounts_type_mask_unique_key;

-- Make type_mask_unique nullable since it's no longer required
ALTER TABLE accounts
  ALTER COLUMN type_mask_unique DROP NOT NULL;

COMMIT;
