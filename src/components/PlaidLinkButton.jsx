import React, { useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import API from "../api/API";
import { useAuth } from "../hooks/useAuthContext";
import { useToast } from "../hooks/useToast";
import { useCreateLinkToken } from "../hooks/useCreateLinkToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const PlaidLinkButton = ({
  text = "Connect Account",
  className = "btn-primary",
}) => {
  const { user, setUser } = useAuth();
  const { createLinkToken } = useCreateLinkToken();
  const toast = useToast();

  const exchangePublicToken = useCallback(
    async (publicToken) => {
      try {
        await API.post("/api/plaid/exchange-public-token", {
          public_token: publicToken,
          user_id: user.id,
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to exchange public token");
      }
    },
    [toast, user],
  );

  const { open, ready } = usePlaidLink({
    token: user.plaidLinkToken,
    onSuccess: (publicToken) => {
      exchangePublicToken(publicToken);
    },
  });

  const handleButtonClick = async () => {
    if (!user?.plaidLinkToken) {
      const linkToken = await createLinkToken(user.id);
      if (linkToken) {
        setUser((prev) => ({ ...prev, plaidLinkToken: linkToken }));
      }
    }
    if (ready) {
      open();
    }
  };

  return (
    <button onClick={handleButtonClick} className={className}>
      <FontAwesomeIcon icon={faLink} />
      {text}
    </button>
  );
};
export default PlaidLinkButton;
