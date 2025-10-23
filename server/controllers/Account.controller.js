import { eq } from "drizzle-orm";
import { db } from "../db/db.js";
import { accounts } from "../db/schema/accounts.js";
import { institutions } from "../db/schema/institutions.js";

export const GetAccounts = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const userAccounts = await db
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
      .innerJoin(institutions, eq(accounts.institutionId, institutions.id))
      .where(eq(institutions.userId, userId));
    res.json(userAccounts);
  } catch (error) {
    console.error("❌ GetAccounts:", error);
    res.status(500).json({ error: "Failed to retrieve accounts" });
  }
};
