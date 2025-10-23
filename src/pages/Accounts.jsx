import React, { useEffect, useState } from "react";
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

    setDeleteModal({
      type: "institution",
      data: institution,
    });
  };

  const confirmDeleteInstitution = async () => {
    if (!deleteModal || deleteModal.type !== "institution") return;

    setInstitutions((prev) =>
      prev.filter((inst) => inst.id !== deleteModal.data.id),
    );
    setDeleteModal(null);
    // TODO: Call backend API to delete
  };

  const handleDeleteAccount = async (institutionId, accountId) => {
    const institution = institutionData.find(
      (inst) => inst.id === institutionId,
    );
    const account = institution?.accounts.find((acc) => acc.id === accountId);
    if (!account || !institution) return;

    setDeleteModal({
      type: "account",
      data: { institution, account },
    });
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
    // TODO: Call backend API to delete account
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
    // TODO: Call backend API to update name
  };

  if (isLoading) {
    return (
      <BaseLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-(--color-muted)">Loading accounts...</div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Bank Accounts</h1>
            <p className="text-(--color-muted) text-sm mt-1">
              Manage your connected institutions and accounts
            </p>
          </div>
          <PlaidLinkButton />
        </div>

        {/* Empty State */}
        {institutionData.length === 0 ? (
          <div className="glass border border-(--color-border) rounded-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <FontAwesomeIcon
                icon={faUniversity}
                className="w-16 h-16 mx-auto mb-4 text-(--color-muted)"
              />
              <h3 className="text-lg font-semibold mb-2">
                No accounts connected
              </h3>
              <p className="text-(--color-muted) mb-6">
                Connect your bank account to start tracking your finances
              </p>
              <button onClick={() => {}} className="btn-primary">
                Connect Your First Account
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {institutionData.map((institution) => (
              <InstitutionCard
                key={institution.id}
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
            ))}
          </div>
        )}

        {/* Rename Modal */}
        {editingAccount && (
          <RenameModal
            currentName={editingAccount.currentName}
            onSave={saveRename}
            onClose={() => setEditingAccount(null)}
          />
        )}

        {/* Delete Confirmation Modals */}
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
