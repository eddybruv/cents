import React from "react";
import TransactionsTable from "../components/transactions/TransactionsTable";
import { transactions } from "../data/transactionsSample";
import NewTransactionModal from "../components/transactions/NewTransactionModal";
import BaseLayout from "../layout/BaseLayout"; // added
import ActionBar from "../components/ActionBar"; // optional for consistency

const Transactions = () => {
  const [data, setData] = React.useState(transactions);
  const [showModal, setShowModal] = React.useState(false);

  const addTransaction = (tx) => setData((d) => [tx, ...d]);

  return (
    <BaseLayout>
      <div className="p-0 md:p-0 space-y-6">
        {/* layout already provides padding */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
          <div>
            <h1 className="text-xl font-semibold">Transactions</h1>
            <p className="text-xs text-(--color-muted)">
              Manage and review all account activity
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="px-3 py-2 text-xs rounded-md bg-(--color-accent) text-black font-semibold hover:opacity-90"
            >
              + Transaction
            </button>
            <button className="px-3 py-2 text-xs rounded-md border border-(--color-border) hover:border-(--color-accent)">
              Upload Statement
            </button>
          </div>
        </div>
        <TransactionsTable data={data} />
        <NewTransactionModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSave={addTransaction}
        />
      </div>
    </BaseLayout>
  );
};

export default Transactions;
