import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyCheckAlt,
  faPiggyBank,
  faCreditCard,
  faPencilAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from "../../lib/formatCurrency";

const AccountRow = ({ account, institutionId, onDelete, onRename }) => {
  const getAccountIcon = (subtype) => {
    if (subtype === "checking") {
      return faMoneyCheckAlt;
    }
    if (subtype === "savings") {
      return faPiggyBank;
    }
    return faCreditCard;
  };

  return (
    <div className="p-3 sm:p-4 hover:bg-(--color-surface)/30 transition">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="p-2 rounded-lg bg-(--color-surface) text-(--color-muted) flex-shrink-0">
            <FontAwesomeIcon
              icon={getAccountIcon(account.subtype)}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-medium text-sm sm:text-base truncate">
                {account.name}
              </h4>
              <span className="text-xs text-(--color-muted)">
                •••• {account.mask}
              </span>
            </div>
            <p className="text-xs text-(--color-muted) capitalize">
              {account.subtype} • {account.type}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
          <div className="text-left sm:text-right">
            <p className="font-semibold text-base sm:text-lg">
              {formatCurrency(account.balanceCurrent)}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onRename(institutionId, account.id, account.name)}
              className="p-2 hover:bg-(--color-surface) rounded-md transition text-(--color-muted) hover:text-(--color-fg)"
              aria-label="Rename account"
            >
              <FontAwesomeIcon icon={faPencilAlt} className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(institutionId, account.id)}
              className="p-2 hover:bg-red-500/10 rounded-md transition text-red-400"
              aria-label="Delete account"
            >
              <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountRow;
