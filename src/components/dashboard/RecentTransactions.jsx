import React from "react";
import moment from "moment";
import { spendingByDay, categories } from "../../data/spendingSample";

const categoryMap = Object.fromEntries(categories.map(c => [c.key, c.color]));

const RecentTransactions = ({ limit = 10 , className}) => {
  const rows = React.useMemo(() => {
    return [...spendingByDay]
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
      .slice(0, limit);
  }, [limit]);

  return (
    <div className={`glass rounded-sm border border-(--color-border) h-full flex flex-col overflow-hidden ${className}`}>
      <div className="p-4 border-b border-(--color-border)">
        <h3 className="text-lg font-semibold">Recent transactions</h3>
        <p className="text-(--color-muted) text-xs">Latest activity (sample data)</p>
      </div>
      <ul className="flex-1 overflow-auto divide-y divide-(--color-border)">
        {rows.map((tx, idx) => {
          const color = categoryMap[tx.category] || "var(--color-fg)";
          return (
            <li key={idx} className="flex items-center gap-3 px-4 py-3 text-sm">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: color }}
                aria-hidden
              />
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium">{tx.merchant}</p>
                <p className="text-[11px] text-(--color-muted)">
                  {tx.category} • {moment(tx.date).format("MMM D")}
                </p>
              </div>
              <div className="font-semibold tabular-nums">
                {new Intl.NumberFormat("en-US", { style: "currency", currency: "CAD" }).format(tx.amount)}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="p-3 border-t border-(--color-border) text-center">
        <button className="text-xs text-(--color-muted) hover:text-(--color-fg) transition">View all</button>
      </div>
    </div>
  );
};

export default RecentTransactions;
