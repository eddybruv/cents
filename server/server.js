/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
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

app.use(cors());
app.use(express.json());
app.use("/api/plaid", PlaidRoute);
app.use("/api/transactions", TransactionRoute);
app.use("/api/accounts", AccountsRoute);
app.use("/api/categories", CategoriesRoute);
app.use("/api/institutions", InstitutionsRoute);
app.use("/api/investments", InvestmentsRoute);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`🏃💨 Server is running on port ${PORT}`);
});
