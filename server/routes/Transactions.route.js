import express from "express";
import {
  GetFilteredTransactions,
  GetTransactions,
  SyncPlaidTransactions,
} from "../controllers/Transactions.controller.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.patch("/sync/:institutionId", authenticateToken, SyncPlaidTransactions);
router.get("/", authenticateToken, GetTransactions);
router.get("/filters", authenticateToken, GetFilteredTransactions);

export default router;
