import React from "react";

const Insights = () => {
  return (
    <div className="glass border border-(--color-border) rounded-md p-4 h-full flex flex-col">
      <h3 className="font-semibold text-sm mb-2">Insights & ideas</h3>
      <ul className="text-[11px] leading-relaxed list-disc pl-4 space-y-1 text-(--color-muted)">
        <li>
          Dining is pacing 12% over time-based allowance. Consider a mid-month
          freeze.
        </li>
        <li>
          Groceries trend shows a spike every 2 weeks – batch plan to smooth
          cash flow.
        </li>
        <li>Shopping category already at 72% – auto-alert at 85% threshold.</li>
        <li>Utilities under-spend suggests room to reallocate next month.</li>
      </ul>
      <div className="mt-auto pt-4 text-[10px] text-(--color-muted)">
        Forecasting module coming soon…
      </div>
    </div>
  );
};

export default Insights;
