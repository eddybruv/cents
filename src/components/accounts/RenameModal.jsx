import React from "react";
import PropTypes from "prop-types";

const RenameModal = ({ currentName, onSave, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 modal-overlay"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md modal-panel p-4 sm:p-6 space-y-4">
        <h2 className="text-base sm:text-lg font-semibold">Rename Account</h2>
        <div className="space-y-2">
          <label
            htmlFor="rename-input"
            className="text-sm text-(--color-muted)"
          >
            Account Name
          </label>
          <input
            id="rename-input"
            type="text"
            defaultValue={currentName}
            className="w-full px-3 py-2 rounded-md bg-(--color-surface) border border-(--color-border) focus:outline-none focus:border-(--color-accent)"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") onSave();
              if (e.key === "Escape") onClose();
            }}
          />
        </div>
        <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-2">
          <button onClick={onClose} className="btn-secondary w-full sm:w-auto">
            Cancel
          </button>
          <button onClick={onSave} className="btn-primary w-full sm:w-auto">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

RenameModal.propTypes = {
  currentName: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RenameModal;
