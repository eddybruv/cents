/* eslint-disable no-undef */
import plaidClient from "../services/plaidConfig.js";

const CreateLinkToken = async (req, res) => {
  const { userId } = req.body;
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    return res.status(400).json({ error: "Invalid or missing userId" });
  }
  const config = {
    user: {
      client_user_id: userId,
    },
    client_name: "cents",
    products: ["auth"],
    country_codes: process.env.VITE_PLAID_COUNTRY_CODES.split(","),
    language: "en",
  };
  try {
    const createTokenResponse = await plaidClient.linkTokenCreate(config);
    res.json(createTokenResponse.data);
  } catch (error) {
    const {
    res.status(error.status || 500).json(data);
    } = error;
    console.log("error", error);
    res.status(error.status).json(data);
  }
};

export { CreateLinkToken };
