import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faTrash,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import AccountRow from "./AccountRow";
import { formatCurrency } from "../../lib/formatCurrency";
import API from "../../api/API";
import { useQueryClient } from "@tanstack/react-query";

const InstitutionCard = ({
  institution,
  onDeleteInstitution,
  onDeleteAccount,
  onRenameAccount,
  accounts,
}) => {
  const [expanded, setExpanded] = React.useState(true);
  const [syncing, setSyncing] = React.useState(false);
  const [syncError, setSyncError] = React.useState(null);
  const queryClient = useQueryClient();

  const handleSync = async () => {
    setSyncing(true);
    setSyncError(null);
    try {
      await API.post("/api/plaid/sync-transactions", {
        institutionId: institution.id,
      });
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
      await queryClient.invalidateQueries({ queryKey: ["accounts"] });
    } catch (err) {
      setSyncError(err?.response?.data?.error || "Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  const totalBalance = accounts.reduce(
    (sum, acc) => sum + parseFloat(acc.balanceCurrent || 0),
    0,
  );

  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={`data:image/png;base64,${institution.logo}`}
              alt={institution.name}
              className="w-10 h-10 rounded-lg object-contain bg-(--color-surface-elevated) p-1.5"
            />
            <div>
              <h3 className="font-semibold text-[15px] tracking-tight">{institution.name}</h3>
              <p className="text-xs text-(--color-muted)">
                {accounts.length} account
                {accounts.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right flex-1 sm:flex-none mr-2">
              <p className="text-[11px] text-(--color-muted) uppercase tracking-wider">Balance</p>
              <p className="font-semibold text-base tabular-nums tracking-tight">
                {formatCurrency(totalBalance)}
              </p>
            </div>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="p-2 hover:bg-(--color-surface-elevated) rounded-lg transition-all text-(--color-muted) hover:text-(--color-fg) disabled:opacity-50"
              aria-label="Sync transactions"
              title="Sync transactions"
            >
              <FontAwesomeIcon
                icon={faRotate}
                className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`}
              />
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 hover:bg-(--color-surface-elevated) rounded-lg transition-all text-(--color-muted)"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              />
            </button>
            <button
              onClick={() => onDeleteInstitution(institution.id)}
              className="p-2 hover:bg-red-500/10 rounded-lg transition-all text-(--color-muted) hover:text-red-400"
              aria-label="Delete institution"
            >
              <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {syncError && (
        <div className="px-5 py-2.5 bg-red-500/8 border-t border-(--color-border) text-red-400 text-sm">
          {syncError}
        </div>
      )}

      {expanded && (
        <div className="border-t border-(--color-border) divide-y divide-(--color-border)">
          {accounts.map((account) => (
            <AccountRow
              key={account.id}
              account={account}
              institutionId={institution.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

InstitutionCard.propTypes = {
  institution: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    logo: PropTypes.string,
  }).isRequired,
  onDeleteInstitution: PropTypes.func,
  onDeleteAccount: PropTypes.func,
  onRenameAccount: PropTypes.func,
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      balanceCurrent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  ).isRequired,
};

export default InstitutionCard;
