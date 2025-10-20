import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteAccountModal = ({ account, institution, onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md glass border border-red-500/30 rounded-lg p-4 sm:p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-red-500/10">
            <FontAwesomeIcon
              icon={faTrash}
              className="w-4 h-4 sm:w-5 sm:h-5 text-red-400"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-base sm:text-lg font-semibold text-red-400">
              Remove Account
            </h2>
            <p className="text-xs sm:text-sm text-(--color-muted) mt-1">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="space-y-3 py-2">
          <p className="text-xs sm:text-sm">
            Are you sure you want to remove{" "}
            <span className="font-semibold">{account.name}</span> from{" "}
            <span className="font-semibold">{institution.name}</span>?
          </p>
          <div className="p-3 rounded-md bg-(--color-surface) border border-(--color-border)">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-(--color-muted)">
                Account Details
              </span>
              <span className="text-xs text-(--color-muted)">
                •••• {account.mask}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <span className="text-xs sm:text-sm capitalize">
                {account.subtype} • {account.type}
              </span>
              <span className="font-semibold text-sm sm:text-base">
                $
                {account.balance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
          <p className="text-xs text-(--color-muted)">
            All transaction history associated with this account will be
            removed.
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-2 pt-2">
          <button onClick={onClose} className="btn-secondary w-full sm:w-auto">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-4 py-2 text-sm rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Remove Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
