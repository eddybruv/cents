import express from "express";
import {
  GetInvestments,
  SyncPlaidInvestments,
} from "../controllers/Investments.controller.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get-all", authenticateToken, GetInvestments);
router.patch("/sync/:institutionId", authenticateToken, SyncPlaidInvestments);

export default router;
