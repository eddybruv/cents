import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const RecentTransactions = ({
  limit = 10,
  className = "",
  transactions = [],
  categories = [],
}) => {
  const navigate = useNavigate();
  const rows = React.useMemo(() => {
    return transactions.slice(0, limit);
  }, [limit, transactions]);

  const categoryMap = React.useMemo(() => {
    const map = {};
    categories.forEach((c) => {
      map[c.name] = c.color;
    });
    return map;
  }, [categories]);

  return (
    <div
      className={`card rounded-xl h-full flex flex-col overflow-hidden ${className}`}
    >
      <div className="p-4 border-b border-(--color-border)">
        <h3 className="text-base font-semibold tracking-tight">
          Recent transactions
        </h3>
        <p className="text-(--color-muted) text-[11px] mt-0.5">
          Latest activity
        </p>
      </div>
      <ul className="flex-1 overflow-auto">
        {rows.map((tx, idx) => {
          const color = categoryMap[tx.category] || "var(--color-muted)";
          return (
            <li
              key={idx}
              className="flex items-center gap-3 px-4 py-3 text-sm border-b border-(--color-border) last:border-b-0 transition-colors hover:bg-(--color-surface-elevated)"
            >
              <span
                className="h-2 w-2 rounded-full flex-shrink-0"
                style={{ background: color }}
                aria-hidden
              />
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium text-[13px]">
                  {tx.merchantName || tx.name}
                </p>
                <p className="text-[11px] text-(--color-muted)">
                  {tx.category} &middot; {moment(tx.date).format("MMM D")}
                </p>
              </div>
              <div className="font-semibold tabular-nums text-[13px]">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "CAD",
                }).format(tx.amount)}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="p-3 border-t border-(--color-border) text-center">
        <button
          onClick={() => navigate("/transactions")}
          className="text-xs text-(--color-muted) hover:text-(--color-accent) hover:cursor-pointer transition-colors font-medium"
        >
          View all transactions &rarr;
        </button>
      </div>
    </div>
  );
};

export default RecentTransactions;
