import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteInstitutionModal = ({ institution, onConfirm, onClose }) => {
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
              Remove Institution
            </h2>
            <p className="text-xs sm:text-sm text-(--color-muted) mt-1">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="space-y-3 py-2">
          <p className="text-xs sm:text-sm">
            Are you sure you want to remove{" "}
            <span className="font-semibold">{institution.name}</span>?
          </p>
          <div className="p-3 rounded-md bg-(--color-surface) border border-(--color-border)">
            <p className="text-xs text-(--color-muted) mb-2">
              This will remove:
            </p>
            <ul className="text-xs sm:text-sm space-y-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent)" />
                {institution.accounts.length} account
                {institution.accounts.length !== 1 ? "s" : ""}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent)" />
                All associated transaction history
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-2 pt-2">
          <button onClick={onClose} className="btn-secondary w-full sm:w-auto">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-4 py-2 text-sm rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Remove Institution
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteInstitutionModal;
