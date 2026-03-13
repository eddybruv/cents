/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import PlaidRoute from "./routes/Plaid.route.js";
import TransactionRoute from "./routes/Transactions.route.js";
import AccountsRoute from "./routes/Accounts.route.js";
import CategoriesRoute from "./routes/Categories.route.js";
import InstitutionsRoute from "./routes/Institutions.route.js";
import InvestmentsRoute from "./routes/Investments.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 8000;

// ── Global middleware ───────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(logger);

// ── Routes ──────────────────────────────────────────────────
app.use("/api/plaid", PlaidRoute);
app.use("/api/transactions", TransactionRoute);
app.use("/api/accounts", AccountsRoute);
app.use("/api/categories", CategoriesRoute);
app.use("/api/institutions", InstitutionsRoute);
app.use("/api/investments", InvestmentsRoute);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

// ── Global error handler (must be last) ─────────────────────
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
