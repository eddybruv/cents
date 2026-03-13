import { supabaseClient } from "../lib/supabase.js";
import { ApiError } from "../lib/ApiError.js";

const authenticateToken = async (req, res, next) => {
  try {
    const header = req.get("Authorization");
    if (!header || !header.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Missing or malformed authorization header");
    }

    const token = header.slice(7);
    if (!token) {
      throw ApiError.unauthorized("No token provided");
    }

    const {
      data: { user },
      error,
    } = await supabaseClient.auth.getUser(token);

    if (error || !user) {
      throw ApiError.unauthorized("Invalid or expired token");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticateToken;
