import React, { useEffect, useState } from "react";
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

const Dashboard = () => {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const { link_token: token } = await API.post(
          "/api/plaid/create-link-token",
          { userId: "user-id" },
        );

        setLinkToken(token);
      } catch (error) {
        console.error("Error fetching link token:", error);
      }
    };

    if (!linkToken) {
      fetchLinkToken();
    }
  }, [linkToken]);

  

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
