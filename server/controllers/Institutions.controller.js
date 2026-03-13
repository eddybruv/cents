import { eq } from "drizzle-orm";
import { institutions } from "../db/schema/institutions.js";
import { db } from "../db/db.js";
import { ApiError } from "../lib/ApiError.js";

export const GetInstitutions = async (req, res, next) => {
  const userId = req.user?.id;
  if (!userId) return next(ApiError.unauthorized());

  try {
    const userInstitutions = await db
      .select()
      .from(institutions)
      .where(eq(institutions.userId, userId));

    res.json(userInstitutions);
  } catch (error) {
    next(error);
  }
};
