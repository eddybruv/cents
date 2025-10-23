import { db } from "../db/db.js";
import { categories } from "../db/schema/categories.js";

export const GetCategories = async (req, res) => {
  try {
    const rows = await db.select().from(categories).orderBy(categories.name);
    res.json(rows);
  } catch (error) {
    console.error("❌ GetCategories:", error);
    res.status(500).json({ error: "Failed to retrieve categories" });
  }
};

export default { GetCategories };
