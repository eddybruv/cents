import { db } from "../db/db.js";
import { institutions } from "../db/schema/institutions.js";
import { accounts } from "../db/schema/accounts.js";
import plaidClient from "../services/plaidConfig.js";
import { eq } from "drizzle-orm";

// Simple controller to return investment-style accounts for the authenticated user
export const GetInvestments = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Query accounts joined to institutions, filter by user and account type containing 'investment'
    const rows = await db
      .select({
        id: accounts.id,
        name: accounts.name,
        type: accounts.type,
        subtype: accounts.subtype,
        mask: accounts.mask,
        balanceAvailable: accounts.balanceAvailable,
        balanceCurrent: accounts.balanceCurrent,
        currencyCode: accounts.currencyCode,
        institutionId: accounts.institutionId,
        institutionName: institutions.name,
      })
      .from(accounts)
      .innerJoin(institutions, institutions.id.eq(accounts.institutionId))
      .where(institutions.userId.eq(userId))
      .where(accounts.type.eq("investment"));

    res.json(rows);
  } catch (error) {
    console.error("❌ GetInvestments:", error);
    res.status(500).json({ error: "Failed to retrieve investments" });
  }
};

export default { GetInvestments };

export const SyncPlaidInvestments = async (req, res) => {
  const { institutionId } = req.params;
  console.log("SyncPlaidInvestments called for institutionId:", institutionId);

  try {
    const institution = await db
      .select({ accessToken: institutions.accessToken })
      .from(institutions)
      .where(eq(institutions.id, institutionId));

    if (institution.length === 0) {
      return res.status(404).json({ error: "Institution not found" });
    }

    const accessToken = institution[0].accessToken;

    // Call Plaid investments holdings endpoint
    const { data } = await plaidClient.investmentsHoldingsGet({
      access_token: accessToken,
    });

    // For now, return the raw holdings payload. Later we can persist holdings/securities.
    return res.json({ holdings: data });
  } catch (error) {
    console.error(
      "❌ SyncPlaidInvestments:",
      error?.response?.data || error.message || error,
    );
    return res.status(500).json({ error: "Failed to sync investments" });
  }
};
