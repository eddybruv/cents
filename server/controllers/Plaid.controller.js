/* eslint-disable no-undef */
import { db } from "../db/db.js";
import { institutions } from "../db/schema/institutions.js";
import plaidClient from "../services/plaidConfig.js";

const CreateLinkToken = async (req, res) => {
  const { userId } = req.body;
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    return res.status(400).json({ error: "Invalid or missing userId" });
  }
  const config = {
    user: {
      client_user_id: userId,
    },
    client_name: "cents",
    products: ["auth"],
    country_codes: process.env.VITE_PLAID_COUNTRY_CODES.split(","),
    language: "en",
  };
  try {
    const createTokenResponse = await plaidClient.linkTokenCreate(config);
    res.json(createTokenResponse.data);
  } catch (error) {
    const {
      response: { data },
    } = error;
    console.log("error", error);
    res.status(error.status).json(data);
  }
};

const ExchangePublicToken = async (req, res) => {
  const { public_token, user_id } = req.body;
  if (!public_token || typeof public_token !== "string") {
    return res.status(400).json({ error: "Invalid or missing public_token" });
  }

  try {
    const exchangeTokenResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    const [institutionSync] = await Promise.all([
      SyncInstitutions(exchangeTokenResponse.data.access_token, user_id),
    ]);

    res.json(exchangeTokenResponse.data);
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json(error);
  }
};

// get / update supabase (with drizzle) institutions
const SyncInstitutions = async (accessToken, userId) => {
  try {
    const itemResponse = await plaidClient.itemGet({ access_token: accessToken });
    const item = itemResponse.data.item;
    const institutionId = item.institution_id;
    if (!institutionId) {
      throw new Error("No institution ID found for the item");
    }
    const { data: { institution } } = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: process.env.VITE_PLAID_COUNTRY_CODES.split(","),
      options: {
        include_auth_metadata: false
      }
    });

    const { institution_id, name } = institution;
    // await db insert with drizzle
    await db.insert(institutions).values({
      plaidInstitutionId: institution_id,
      name,
      accessToken,
      userId,
      uniqueId: `${institution_id}-${userId}`,
    }).onConflictDoUpdate({
      target: institutions.uniqueId,
      set: {
        accessToken: accessToken,
        name: name,
      }
    }).catch((e) => { console.error("❌ DB Insert Error: ", e) });

  } catch (error) {
    const {
      response: { data },
    } = error;
    console.log("error", data);
  }
};

// create / update accounts

// get transactions


export { CreateLinkToken, ExchangePublicToken };
