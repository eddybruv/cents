/* eslint-disable no-undef */
import { eq } from "drizzle-orm";
import { db } from "../db/db.js";
import { institutions } from "../db/schema/institutions.js";
import { accounts } from "../db/schema/accounts.js";
import plaidClient from "../services/plaidConfig.js";

const COUNTRY_CODES = process.env.VITE_PLAID_COUNTRY_CODES.split(",");

/* -------------------- Create Link Token -------------------- */
export const CreateLinkToken = async (req, res) => {
  const { userId } = req.body;
  if (!userId || typeof userId !== "string" || !userId.trim())
    return res.status(400).json({ error: "Invalid or missing userId" });

  try {
    const config = {
      user: { client_user_id: userId },
      client_name: "Cents",
      products: ["auth"],
      country_codes: COUNTRY_CODES,
      language: "en",
    };
    const { data } = await plaidClient.linkTokenCreate(config);
    res.json(data);
  } catch (error) {
    const status = error?.response?.status || 500;
    const message = error?.response?.data || { error: "Plaid error" };
    console.error("❌ CreateLinkToken:", message);
    res.status(status).json(message);
  }
};

/* -------------------- Exchange Public Token -------------------- */
export const ExchangePublicToken = async (req, res) => {
  const { public_token: publicToken, user_id: userId } = req.body;
  if (!publicToken || typeof publicToken !== "string")
    return res.status(400).json({ error: "Invalid or missing public_token" });

  try {
    const { data } = await plaidClient.itemPublicTokenExchange({ public_token: publicToken });
    const accessToken = data.access_token;

    const institutionOk = await SyncInstitutions(accessToken, userId);
    if (!institutionOk) return res.status(500).json({ error: "Failed to sync institution data" });

    const userInstitutions = await db.select().from(institutions).where(eq(institutions.userId, userId));

    await Promise.all(userInstitutions.map(i => SyncAccounts(i.accessToken, i.id)));

    res.json(data);
  } catch (error) {
    const status = error?.response?.status || 500;
    const message = error?.response?.data || { error: "Plaid error" };
    console.error("❌ ExchangePublicToken:", message);
    res.status(status).json(message);
  }
};

/* -------------------- Sync Institutions -------------------- */
const SyncInstitutions = async (accessToken, userId) => {
  try {
    const { data: { item } } = await plaidClient.itemGet({ access_token: accessToken });
    if (!item?.institution_id) throw new Error("No institution ID found");

    const { data: { institution } } = await plaidClient.institutionsGetById({
      institution_id: item.institution_id,
      country_codes: COUNTRY_CODES,
    });

    await db.insert(institutions)
      .values({
        plaidInstitutionId: institution.institution_id,
        name: institution.name,
        accessToken,
        userId,
        uniqueId: `${institution.institution_id}-${userId}`,
      })
      .onConflictDoUpdate({
        target: institutions.uniqueId,
        set: { accessToken, name: institution.name },
      });

    return true;
  } catch (error) {
    console.error("❌ SyncInstitutions:", error?.response?.data || error.message);
    return false;
  }
};

/* -------------------- Sync Accounts -------------------- */
const SyncAccounts = async (accessToken, institutionId) => {
  try {
    const { data } = await plaidClient.accountsGet({ access_token: accessToken });
    const plaidAccounts = data.accounts;

    await Promise.all(plaidAccounts.map(async acc => {
      const {
        account_id: plaidAccountId,
        name,
        type,
        subtype,
        mask,
        balances: {
          available: balanceAvailable,
          current: balanceCurrent,
          iso_currency_code: currencyCode,
        },
      } = acc;

      await db.insert(accounts)
        .values({
          plaidAccountId,
          name,
          type,
          subtype,
          mask,
          balanceAvailable,
          balanceCurrent,
          currencyCode,
          institutionId,
        })
        .onConflictDoUpdate({
          target: accounts.plaidAccountId,
          set: { name, type, subtype, mask, balanceAvailable, balanceCurrent, currencyCode },
        });
    }));

    return true;
  } catch (error) {
    console.error("❌ SyncAccounts:", error?.response?.data || error.message);
    return false;
  }
};

// get transactions
