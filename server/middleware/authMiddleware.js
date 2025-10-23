// middleware/authMiddleware.js

import { supabaseClient } from "../lib/supabase.js";

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    const {
      data: { user },
      error,
    } = await supabaseClient.auth.getUser(token);
    if (error || !user) {
      console.error("❌ Auth middleware error:", error);
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
};

export default authenticateToken;
