import React, { useEffect, useMemo, useState } from "react";
import ChartTooltip from "../Tooltip/ChartTooltip";
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

const formatCurrency = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n ?? 0);

const formatDate = (iso) => moment(iso).format("MMM D");

const buildSeries = (rows, categories, visible, dayRange = "month") => {
  let days = [];

  if (dayRange === "year") {
    const start = moment().startOf("year");
    const end = moment().endOf("year");
    for (let m = start; m.isBefore(end); m.add(1, "days")) {
      days.push(m.format("YYYY-MM-DD"));
    }
  } else if (dayRange === "month") {
    const start = moment().startOf("month");
    const end = moment().endOf("month");
    for (let m = start; m.isBefore(end); m.add(1, "days")) {
      days.push(m.format("YYYY-MM-DD"));
    }
  } else if (dayRange === "week") {
    const start = moment().startOf("week");
    const end = moment().endOf("week");
    for (let m = start; m.isBefore(end); m.add(1, "days")) {
      days.push(m.format("YYYY-MM-DD"));
    }
  }

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
    if (idx === undefined) continue;
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
    () =>
      buildSeries(
        transactions.filter((t) => t.amount > 0),
        categories,
        visibleCats,
      ),
    [visibleCats, categories, transactions],
  );

  useEffect(() => {
    setVisibleCats(Object.fromEntries(categories.map((c) => [c.name, true])));
  }, [categories]);

  const toggleCat = (k) =>
    setVisibleCats((prev) => ({ ...prev, [k]: !prev[k] }));

  return (
    <div
      className={`card rounded-xl p-5 flex flex-col ${className}`}
    >
      <div className="flex items-start justify-between mb-5 gap-4 flex-wrap">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">Spending overview</h3>
          <p className="text-(--color-muted) text-xs mt-0.5">Month to date</p>
        </div>
        <div className="flex gap-1.5 flex-wrap justify-end">
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => toggleCat(c.name)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium hover:cursor-pointer transition-all duration-200"
              style={{
                background: visibleCats[c.name] ? c.color : "transparent",
                border: `1px solid ${visibleCats[c.name] ? c.color : "var(--color-border-strong)"}`,
                color: visibleCats[c.name] ? "#09090b" : "var(--color-muted)",
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
                  <stop offset="5%" stopColor={c.color} stopOpacity={0.6} />
                  <stop offset="95%" stopColor={c.color} stopOpacity={0.02} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              stroke="var(--color-border)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke="var(--color-muted)"
              tick={{ fontSize: 11 }}
              axisLine={{ stroke: "var(--color-border)" }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
              stroke="var(--color-muted)"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || payload.length === 0) return null;
                const items = payload.filter((p) => p && Number(p.value) > 0);
                if (items.length === 0) return null;
                return (
                  <ChartTooltip
                    label={label}
                    items={items}
                    formatDate={formatDate}
                    formatCurrency={formatCurrency}
                  />
                );
              }}
            />
            {categories.map((c) => (
              <Area
                key={c.name}
                type="monotone"
                dataKey={c.name}
                stackId="1"
                stroke={c.color}
                fill={`url(#grad-${c.name})`}
                strokeWidth={1.5}
                hide={!visibleCats[c.name]}
                isAnimationActive={true}
              />
            ))}
            <Brush
              dataKey="date"
              height={14}
              stroke="var(--color-border-strong)"
              travellerWidth={6}
              fill="var(--color-surface)"
            />
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
        {categories.slice(0, 4).map((c) => {
          const sum = data.reduce((s, d) => s + (d[c.name] || 0), 0);
          return (
            <div
              key={c.name}
              className="rounded-lg p-3 transition-colors hover:bg-(--color-surface-elevated)"
              style={{ border: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: c.color }}
                />
                <p className="text-[11px] text-(--color-muted)">{c.name}</p>
              </div>
              <p className="text-base font-semibold tabular-nums tracking-tight">
                {formatCurrency(sum)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpensesAnalysis;
