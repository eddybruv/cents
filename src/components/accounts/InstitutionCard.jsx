import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import AccountRow from "./AccountRow";
import Avatar from "../Avatar";

const InstitutionCard = ({
  institution,
  onDeleteInstitution,
  onDeleteAccount,
  onRenameAccount,
}) => {
  const [expanded, setExpanded] = React.useState(true);

  const totalBalance = institution.accounts.reduce(
    (sum, acc) => sum + acc.balance,
    0,
  );

  return (
    <div className="glass border border-(--color-border) rounded-lg overflow-hidden">
      {/* Institution Header */}
      <div className="p-4 bg-(--color-surface)/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar
              src={institution.logo}
              name={institution.name}
              size="lg"
              alt={institution.name}
            />
            <div>
              <h3 className="font-semibold text-base">{institution.name}</h3>
              <p className="text-sm text-(--color-muted)">
                {institution.accounts.length} account
                {institution.accounts.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-right flex-1 sm:flex-none">
              <p className="text-xs text-(--color-muted)">Total Balance</p>
              <p className="font-semibold text-base sm:text-lg">
                $
                {totalBalance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 hover:bg-(--color-surface) rounded-md transition"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
            <button
              onClick={() => onDeleteInstitution(institution.id)}
              className="p-2 hover:bg-red-500/10 rounded-md transition text-red-400"
              aria-label="Delete institution"
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Accounts List */}
      {expanded && (
        <div className="divide-y divide-(--color-border)">
          {institution.accounts.map((account) => (
            <AccountRow
              key={account.id}
              account={account}
              institutionId={institution.id}
              onDelete={onDeleteAccount}
              onRename={onRenameAccount}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InstitutionCard;
