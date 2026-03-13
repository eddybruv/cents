import React, { useEffect } from "react";
import TransactionsTable from "../components/transactions/TransactionsTable";
import NewTransactionModal from "../components/transactions/NewTransactionModal";
import BaseLayout from "../layout/BaseLayout";
import { useTransactions } from "../hooks/useTransactions";
import { useToast } from "../hooks/useToast";
import { getErrorMessage } from "../api/API";

const Transactions = () => {
  const { data, error } = useTransactions();
  const toast = useToast();
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    if (error) {
      toast.error(getErrorMessage(error, "Failed to load transactions"));
    }
  }, [error]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BaseLayout>
      <div className="space-y-6">
        <div className="animate-in flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
            <p className="text-sm text-(--color-muted) mt-1">
              Manage and review all account activity
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary"
            >
              + Transaction
            </button>
            <button className="btn-secondary">
              Upload Statement
            </button>
          </div>
        </div>
        <div className="animate-in stagger-2">
          <TransactionsTable data={data} />
        </div>
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
