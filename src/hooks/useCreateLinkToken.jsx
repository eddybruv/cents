import { useState } from "react";
import API from "../api/API";
export function useCreateLinkToken() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createLinkToken = async (userId) => {
    try {
      setLoading(true);
      const res = await API.post("/api/plaid/create-link-token", { userId });
      return res.data.link_token;
    } catch (err) {
      console.error("Error creating link token:", err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createLinkToken, loading, error };
}
