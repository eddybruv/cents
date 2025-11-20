import React from "react";

// Generic chart tooltip component. Accepts formatting functions as props so
// the parent can control locale/currency formatting.
export default function ChartTooltip({ label, items = [], formatDate, formatCurrency }) {
  if (!items || items.length === 0) return null;

  return (
    <div
      className="p-2 min-w-[160px] text-sm"
      style={{
        background: "var(--color-bg)",
        border: "1px solid var(--color-border)",
        color: "var(--color-fg)",
      }}
    >
      <div className="text-xs mb-1">{formatDate ? formatDate(label) : label}</div>
      {items.map((i) => (
        <div key={i.name} className="flex justify-between items-center gap-2 mb-1">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-sm inline-block"
              style={{ background: i.color || "#ccc" }}
            />
            <span className="text-xs">{i.name}</span>
          </div>
          <div className="font-semibold">
            {formatCurrency ? formatCurrency(i.value) : i.value}
          </div>
        </div>
      ))}
    </div>
  );
}
