import React, { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Brush,
} from "recharts";
import moment from "moment";
// import { spendingByDay, categories } from "../../data/spendingSample";

const formatCurrency = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n ?? 0);

const formatDate = (iso) => moment(iso).format("MMM D");

// Aggregate sample into stacked series per category per day
const buildSeries = (rows, categories, visible) => {
  // get days range
  const days = Array.from(new Set(rows.map((r) => r.date))).sort();

  const mapByDay = days.map((d) => {
    const row = { date: d };
    for (const c of categories) {
      row[c.name] = 0;
    }
    return row;
  });

  const dayIndex = Object.fromEntries(days.map((d, i) => [d, i]));

  for (const r of rows) {
    if (!visible[r.category]) continue;
    const idx = dayIndex[r.date];
    mapByDay[idx][r.category] += parseFloat(r.amount);
  }

  return mapByDay;
};

const ExpensesAnalysis = ({
  className,
  categories = [],
  transactions = [],
}) => {
  const [visibleCats, setVisibleCats] = useState(
    Object.fromEntries(categories.map((c) => [c.name, true])),
  );

  const data = useMemo(
    () => buildSeries(transactions, categories, visibleCats),
    [visibleCats, categories, transactions],
  );

  const toggleCat = (k) =>
    setVisibleCats((prev) => ({ ...prev, [k]: !prev[k] }));

  return (
    <div
      className={` glass rounded-sm border border-(--color-border) p-4 flex flex-col ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold">Spending overview</h3>
          <p className="text-(--color-muted) text-sm">Month to date</p>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => toggleCat(c.name)}
              className="px-2 py-1 rounded-md border hover:cursor-pointer text-xs"
              style={{
                background: visibleCats[c.name] ? c.color : "transparent",
                borderColor: "var(--color-border)",
                color: visibleCats[c.name] ? "#0b0b0c" : "var(--color-fg)",
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
          >
            <defs>
              {categories.map((c) => (
                <linearGradient
                  id={`grad-${c.name}`}
                  key={c.name}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={c.color} stopOpacity={0.7} />
                  <stop offset="95%" stopColor={c.color} stopOpacity={0.05} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke="var(--color-muted)"
            />
            <YAxis
              tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
              stroke="var(--color-muted)"
            />
            <Tooltip
              contentStyle={{
                background: "var(--color-bg)",
                border: `1px solid var(--color-border)`,
                color: "var(--color-fg)",
              }}
              formatter={(value, name) => [formatCurrency(value), name]}
              labelFormatter={(l) => formatDate(l)}
            />
            {categories.map((c) => (
              <Area
                key={c.name}
                type="monotone"
                dataKey={c.name}
                stackId="1"
                stroke={c.color}
                fill={`url(#grad-${c.name})`}
                strokeWidth={2}
                hide={!visibleCats[c.name]}
                isAnimationActive={true}
              />
            ))}
            <Brush
              dataKey="date"
              height={16}
              stroke="var(--color-border)"
              travellerWidth={6}
            />
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {categories.slice(0, 4).map((c) => {
          const sum = data.reduce((s, d) => s + (d[c.name] || 0), 0);
          return (
            <div
              key={c.name}
              className="rounded-md border border-(--color-border) p-3"
            >
              <p className="text-xs text-(--color-muted)">{c.name}</p>
              <p className="text-lg font-semibold">{formatCurrency(sum)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpensesAnalysis;
