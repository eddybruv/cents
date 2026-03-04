import express from "express";
import {
  CreateLinkToken,
  ExchangePublicToken,
  SyncInstitutionTransactions,
} from "../controllers/Plaid.controller.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-link-token", authenticateToken, CreateLinkToken);
router.post("/exchange-public-token", authenticateToken, ExchangePublicToken);
router.post(
  "/sync-transactions",
  authenticateToken,
  SyncInstitutionTransactions,
);

export default router;
