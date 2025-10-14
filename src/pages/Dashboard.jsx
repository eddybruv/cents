import React, { useEffect, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import BaseLayout from "../layout/BaseLayout";
import ActionBar from "../components/ActionBar";
import { Card } from "../components/dashboard/Card";
import { CardSummary } from "../components/dashboard/CardSummary";
import ExpensesAnalysis from "../components/dashboard/ExpensesAnalysis";
import BudgetHeader from "../components/dashboard/BudgetHeader";
import CategoryBudgets from "../components/dashboard/CategoryBudgets";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import API from "../api/API";
import { useAuth } from "../hooks/useAuthContext";

const Dashboard = () => {
  const { plaidData, setPlaidData, user } = useAuth();

  const exchangePublicToken = useCallback(
    async (public_token) => {
      try {
        const { data } = await API.post("/api/plaid/exchange-public-token", {
          public_token,
          user_id: user.id,
        });
        const { access_token, item_id } = data;
        setPlaidData((prev) => ({
          ...prev,
          accessToken: access_token,
          itemId: item_id,
        }));
      } catch (error) {
        console.error("Error exchanging public token:", error);
      }
    },
    [setPlaidData, user],
  );

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const { data } = await API.post("/api/plaid/create-link-token", {
          userId: user.id,
        });
        const { link_token: token } = data;
        setPlaidData((prev) => ({ ...prev, linkToken: token }));
      } catch (error) {
        console.error("Error fetching link token:", error);
      }
    };

    if (!plaidData?.linkToken) {
      fetchLinkToken();
    }
  }, [plaidData, setPlaidData, user]);

  useEffect(() => {
    if (plaidData?.public_token && !plaidData?.accessToken) {
      exchangePublicToken(plaidData.public_token, user.id).then(() => {});
    }
  }, [plaidData, exchangePublicToken, setPlaidData, user]);

  const { open, ready } = usePlaidLink({
    token: plaidData?.linkToken,
    onSuccess: (public_token) => {
      setPlaidData((prev) => ({ ...prev, public_token }));

      exchangePublicToken(public_token, user.id);
    },
    onExit: (err, metadata) => {
      // user exited the Link flow
      console.log("err", err);
      console.log("metadata", metadata);
    },
  });

  useEffect(() => {
    if (!plaidData?.public_token && ready) {
      open();
    }
  }, [open, ready, plaidData]);

  return (
    <BaseLayout>
      <ActionBar page="dashboard" />
      <div className="space-y-4">
        <BudgetHeader />
        <div className="flex-1 grid grid-cols-5 gap-4 w-full pt-1">
          {/* <Card title="Total Balance" className="row-span-1 h-40" />
          <Card title="Total Expenditure" className="row-span-1 h-40" />
          <Card title="Total Savings" className="row-span-1 h-40" /> */}
          {/* <CardSummary className="col-span-2 row-span-4">04</CardSummary> */}
          <ExpensesAnalysis className="col-span-4 row-span-1" />
          <RecentTransactions className="col-span-1 row-span-1" />
          {/* <div className="col-span-3 row-span-3 bg-green-900 h-99">07</div>
          <div className="col-span-2 row-span-3 bg-green-900 ...">08</div> */}
        </div>
        <CategoryBudgets />
      </div>
    </BaseLayout>
  );
};

export default Dashboard;
