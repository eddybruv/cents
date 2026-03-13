import React, { useEffect } from "react";
import BaseLayout from "../layout/BaseLayout";
import ActionBar from "../components/ActionBar";
import ExpensesAnalysis from "../components/dashboard/ExpensesAnalysis";
import BudgetHeader from "../components/dashboard/BudgetHeader";
import CategoryBudgets from "../components/dashboard/CategoryBudgets";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { useToast } from "../hooks/useToast";
import { useTransactions } from "../hooks/useTransactions";
import { useCategories } from "../hooks/useCategories";
import { getErrorMessage } from "../api/API";

const Dashboard = () => {
  const toast = useToast();
  const { data: transactionsData, error: transactionsError } =
    useTransactions();
  const { data: categoriesData, error: categoriesError } = useCategories();

  useEffect(() => {
    if (transactionsError) {
      toast.error(getErrorMessage(transactionsError, "Failed to load transactions"));
    }
    if (categoriesError) {
      toast.error(getErrorMessage(categoriesError, "Failed to load categories"));
    }
  }, [transactionsError, categoriesError]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BaseLayout>
      <ActionBar page="dashboard" />
      <div className="space-y-5">
        <BudgetHeader />
        <div className="animate-in stagger-3 flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4 w-full">
          <ExpensesAnalysis
            className="lg:col-span-4 row-span-1"
            transactions={transactionsData}
            categories={categoriesData}
          />
          <RecentTransactions
            transactions={transactionsData}
            categories={categoriesData}
            className="lg:col-span-1 row-span-1"
          />
        </div>
        <CategoryBudgets />
      </div>
    </BaseLayout>
  );
};

export default Dashboard;
