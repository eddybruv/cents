import { db } from "../db/db.js";
import { institutions } from "../db/schema/institutions.js";
import { accounts } from "../db/schema/accounts.js";
import plaidClient from "../services/plaidConfig.js";
import { eq } from "drizzle-orm";
import { ApiError } from "../lib/ApiError.js";

export const GetInvestments = async (req, res, next) => {
  const userId = req.user?.id;
  if (!userId) return next(ApiError.unauthorized());

  try {
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
      .innerJoin(institutions, eq(institutions.id, accounts.institutionId))
      .where(eq(institutions.userId, userId))
      .where(eq(accounts.type, "investment"));

    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export default { GetInvestments };

export const SyncPlaidInvestments = async (req, res, next) => {
  const { institutionId } = req.params;

  try {
    const institution = await db
      .select({ accessToken: institutions.accessToken })
      .from(institutions)
      .where(eq(institutions.id, institutionId));

    if (institution.length === 0) {
      throw ApiError.notFound("Institution not found");
    }

    const { data } = await plaidClient.investmentsHoldingsGet({
      access_token: institution[0].accessToken,
    });

    res.json({ holdings: data });
  } catch (error) {
    next(error);
  }
};
