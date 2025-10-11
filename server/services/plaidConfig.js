/* eslint-disable no-undef */
import path from "path";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.VITE_PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.VITE_PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.VITE_PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export default plaidClient;
