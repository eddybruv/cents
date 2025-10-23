import { eq } from "drizzle-orm";
import { institutions } from "../db/schema/institutions.js";
import { db } from "../db/db.js";

export const GetInstitutions = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    console.error("Unauthorized access attempt");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const userInstitutions = await db
      .select()
      .from(institutions)
      .where(eq(institutions.userId, userId));
    res.json(userInstitutions);
  } catch (error) {
    console.error("❌ Error fetching user institutions:", error);
    res.status(500).json({ error: "Failed to fetch user institutions" });
  }
};
