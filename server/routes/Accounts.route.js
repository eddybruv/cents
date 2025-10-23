import express from "express";
import { GetAccounts } from "../controllers/Account.controller.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all accounts for the authenticated user
router.get("/", authenticateToken, GetAccounts);

export default router;
