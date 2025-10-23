import React, { useCallback, useEffect, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import ActionBar from "../components/ActionBar";
import ExpensesAnalysis from "../components/dashboard/ExpensesAnalysis";
import BudgetHeader from "../components/dashboard/BudgetHeader";
import CategoryBudgets from "../components/dashboard/CategoryBudgets";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { useToast } from "../hooks/useToast";
import { useTransactions } from "../hooks/useTransactions";
import { useCategories } from "../hooks/useCategories";

const Dashboard = () => {
  const toast = useToast();
  const { data: transactionsData, error: transactionsError } =
    useTransactions();
  const { data: categoriesData, error: categoriesError } = useCategories();

  if (transactionsError || categoriesError) {
    toast.error("Failed to load dashboard data. Please try again later.");
  }

  return (
    <BaseLayout>
      <ActionBar page="dashboard" />
      <div className="space-y-4">
        <BudgetHeader />
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4 w-full pt-1">
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
