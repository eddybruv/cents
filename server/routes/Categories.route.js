import express from "express";
import { GetCategories } from "../controllers/Categories.controller.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, GetCategories);

export default router;
