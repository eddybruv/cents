import express from "express";
import { CreateLinkToken } from "../controllers/Plaid.controller.js";

const router = express.Router();

router.post("/create-link-token", CreateLinkToken);

export default router;
