import { eq } from "drizzle-orm";
import { db } from "../db/db.js";
import { accounts } from "../db/schema/accounts.js";
import { institutions } from "../db/schema/institutions.js";
import { ApiError } from "../lib/ApiError.js";

export const GetAccounts = async (req, res, next) => {
  const userId = req.user?.id;
  if (!userId) return next(ApiError.unauthorized());

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
    next(error);
  }
};
