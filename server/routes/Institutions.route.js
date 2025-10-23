import express from "express";
import { GetInstitutions } from "../controllers/Institutions.controller.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, GetInstitutions);

export default router;
