import React from "react";
import BaseLayout from "../layout/BaseLayout.jsx";
import { BudgetProvider } from "../context/BudgetContext.jsx";
import MonthlyPacing from "../components/budget/MonthlyPacing.jsx";
import Insights from "../components/budget/Insights.jsx";
import BudgetTable from "../components/budget/BudgetTable.jsx";
import BudgetModule from "../components/budget/BudgetModule";
import AddBudgetModal from "../components/budget/AddBudgetModal";

const Budget = () => {
  const [showAdd, setShowAdd] = React.useState(false);
  return (
    <BudgetProvider>
      <BaseLayout>
        <div className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
            <div className="xl:col-span-4 space-y-4">
              <MonthlyPacing
                extraAction={
                  <button
                    onClick={() => setShowAdd(true)}
                    className="btn-primary"
                  >
                    + Budget
                  </button>
                }
              />
              <BudgetTable />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {["groceries", "dining", "shopping", "transport"].map((k) => (
                  <BudgetModule key={k} categoryKey={k} />
                ))}
              </div>
            </div>
            <div className="xl:col-span-1">
              <Insights />
            </div>
          </div>
        </div>
        {showAdd && <AddBudgetModal onClose={() => setShowAdd(false)} />}
      </BaseLayout>
    </BudgetProvider>
  );
};

export default Budget;
