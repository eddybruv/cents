import React from "react";
import TransactionsTable from "../components/transactions/TransactionsTable";
import NewTransactionModal from "../components/transactions/NewTransactionModal";
import BaseLayout from "../layout/BaseLayout"; // added
import ActionBar from "../components/ActionBar"; // optional for consistency
import { useTransactions } from "../hooks/useTransactions";

const Transactions = () => {
  const { data } = useTransactions();
  const [showModal, setShowModal] = React.useState(false);

  // const addTransaction = (tx) => setData((d) => [tx, ...d]);

  return (
    <BaseLayout>
      <div className="p-0 md:p-0 space-y-6">
        {/* layout already provides padding */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">Transactions</h1>
            <p className="text-xs sm:text-sm text-(--color-muted)">
              Manage and review all account activity
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary w-full sm:w-auto"
            >
              + Transaction
            </button>
            <button className="btn-secondary w-full sm:w-auto">
              Upload Statement
            </button>
          </div>
        </div>
        <TransactionsTable data={data} />
        <NewTransactionModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSave={() => {}}
        />
      </div>
    </BaseLayout>
  );
};

export default Transactions;
