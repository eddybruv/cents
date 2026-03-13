import { db } from "../db/db.js";
import { categories } from "../db/schema/categories.js";

export const GetCategories = async (req, res, next) => {
  try {
    const rows = await db.select().from(categories).orderBy(categories.name);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export default { GetCategories };
