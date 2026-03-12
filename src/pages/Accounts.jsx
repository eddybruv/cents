import React, { useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUniversity } from "@fortawesome/free-solid-svg-icons";
import {
  InstitutionCard,
  RenameModal,
  DeleteInstitutionModal,
  DeleteAccountModal,
} from "../components/accounts";
import PlaidLinkButton from "../components/PlaidLinkButton";
import { useInstitutions } from "../hooks/useInstitutions";
import { useAccounts } from "../hooks/useAccounts";

const Accounts = () => {
  const [institutions, setInstitutions] = useState([]);
  const [editingAccount, setEditingAccount] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  const { data: institutionData, error, isLoading } = useInstitutions();
  const { data: accountData, isLoading: isLoadingAccounts } = useAccounts();

  const handleDeleteInstitution = async (institutionId) => {
    const institution = institutionData.find(
      (inst) => inst.id === institutionId,
    );
    if (!institution) return;
    setDeleteModal({ type: "institution", data: institution });
  };

  const confirmDeleteInstitution = async () => {
    if (!deleteModal || deleteModal.type !== "institution") return;
    setInstitutions((prev) =>
      prev.filter((inst) => inst.id !== deleteModal.data.id),
    );
    setDeleteModal(null);
  };

  const handleDeleteAccount = async (institutionId, accountId) => {
    const institution = institutionData.find(
      (inst) => inst.id === institutionId,
    );
    const account = institution?.accounts.find((acc) => acc.id === accountId);
    if (!account || !institution) return;
    setDeleteModal({ type: "account", data: { institution, account } });
  };

  const confirmDeleteAccount = async () => {
    if (!deleteModal || deleteModal.type !== "account") return;
    setInstitutions((prev) =>
      prev.map((inst) =>
        inst.id === deleteModal.data.institution.id
          ? {
              ...inst,
              accounts: inst.accounts.filter(
                (acc) => acc.id !== deleteModal.data.account.id,
              ),
            }
          : inst,
      ),
    );
    setDeleteModal(null);
  };

  const handleRenameAccount = (institutionId, accountId, currentName) => {
    setEditingAccount({ institutionId, accountId, currentName });
  };

  const saveRename = () => {
    if (!editingAccount) return;
    const newName = document.getElementById("rename-input").value;
    if (!newName.trim()) return;
    setInstitutions((prev) =>
      prev.map((inst) =>
        inst.id === editingAccount.institutionId
          ? {
              ...inst,
              accounts: inst.accounts.map((acc) =>
                acc.id === editingAccount.accountId
                  ? { ...acc, name: newName }
                  : acc,
              ),
            }
          : inst,
      ),
    );
    setEditingAccount(null);
  };

  if (isLoading) {
    return (
      <BaseLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-(--color-muted) text-sm">Loading accounts...</div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className="space-y-6">
        <div className="animate-in flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Bank Accounts</h1>
            <p className="text-(--color-muted) text-sm mt-1">
              Manage your connected institutions and accounts
            </p>
          </div>
          <PlaidLinkButton />
        </div>

        {institutionData.length === 0 ? (
          <div className="animate-in stagger-2 card rounded-xl p-16 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-(--color-surface-elevated) flex items-center justify-center mx-auto mb-5">
                <FontAwesomeIcon
                  icon={faUniversity}
                  className="w-7 h-7 text-(--color-muted)"
                />
              </div>
              <h3 className="text-lg font-semibold tracking-tight mb-2">
                No accounts connected
              </h3>
              <p className="text-(--color-muted) text-sm mb-6 leading-relaxed">
                Connect your bank account to start tracking your finances automatically.
              </p>
              <button onClick={() => {}} className="btn-primary">
                Connect Your First Account
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {institutionData.map((institution, i) => (
              <div
                key={institution.id}
                className="animate-in"
                style={{ animationDelay: `${0.1 + i * 0.05}s` }}
              >
                <InstitutionCard
                  institution={institution}
                  onDeleteInstitution={handleDeleteInstitution}
                  onDeleteAccount={handleDeleteAccount}
                  onRenameAccount={handleRenameAccount}
                  accounts={
                    accountData?.filter(
                      (acc) => acc.institutionId === institution.id,
                    ) || []
                  }
                />
              </div>
            ))}
          </div>
        )}

        {editingAccount && (
          <RenameModal
            currentName={editingAccount.currentName}
            onSave={saveRename}
            onClose={() => setEditingAccount(null)}
          />
        )}

        {deleteModal && deleteModal.type === "institution" && (
          <DeleteInstitutionModal
            institution={deleteModal.data}
            onConfirm={confirmDeleteInstitution}
            onClose={() => setDeleteModal(null)}
          />
        )}

        {deleteModal && deleteModal.type === "account" && (
          <DeleteAccountModal
            account={deleteModal.data.account}
            institution={deleteModal.data.institution}
            onConfirm={confirmDeleteAccount}
            onClose={() => setDeleteModal(null)}
          />
        )}
      </div>
    </BaseLayout>
  );
};

export default Accounts;
