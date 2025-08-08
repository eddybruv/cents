import React from "react";
import BaseLayout from "../layout/BaseLayout";
import ActionBar from "../components/ActionBar";
import { Card } from "../components/dashboard/Card";
import { CardSummary } from "../components/dashboard/CardSummary";
const Dashboard = () => {
  return (
    <BaseLayout>
      <ActionBar page="dashboard" />
      <div className="flex-1 grid grid-cols-5 gap-4 w-full pt-5">
        <Card title="Total Balance" className="row-span-1 h-40" />
        <Card title="Total Expenditure" className="row-span-1 h-40" />
        <Card title="Total Savings" className="row-span-1 h-40" />
        <CardSummary className="col-span-2 row-span-4">04</CardSummary>
        <div className="col-span-3 row-span-3 h-82 bg-green-900 ...">05</div>
        <div className="col-span-3 row-span-3 bg-green-900 h-99">07</div>
        <div className="col-span-2 row-span-3 bg-green-900 ...">08</div>
      </div>
    </BaseLayout>
  );
};

export default Dashboard;
