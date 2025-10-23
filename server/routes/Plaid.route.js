import express from "express";
import {
  CreateLinkToken,
  ExchangePublicToken,
} from "../controllers/Plaid.controller.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-link-token", authenticateToken, CreateLinkToken);
router.post("/exchange-public-token", authenticateToken, ExchangePublicToken);

export default router;
