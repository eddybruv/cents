import express from "express";
import { CreateLinkToken, ExchangePublicToken } from "../controllers/Plaid.controller.js";

const router = express.Router();

router.post("/create-link-token", CreateLinkToken);
router.post("/exchange-public-token", ExchangePublicToken);

export default router;
