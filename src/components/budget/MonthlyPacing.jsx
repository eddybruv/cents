import React from "react";
import moment from "moment";
import { useBudget } from "../../hooks/useBudget";

const currency = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n || 0);

const PaceGauge = ({ spent, total, elapsedDays, daysInMonth }) => {
  const spendRate = total ? spent / total : 0;
  const timeRate = daysInMonth ? elapsedDays / daysInMonth : 0;
  const over = spendRate > timeRate + 0.05;
  const under = spendRate < timeRate - 0.05;
  const color = over ? "#ef4444" : under ? "#10b981" : "var(--color-accent)";
  return (
    <div className="relative h-12 flex items-end">
      <div className="absolute left-0 right-0 bottom-0 flex gap-1 h-2">
        <div
          style={{
            width: `${timeRate * 100}%`,
            background: "var(--color-border)",
          }}
        />
        <div
          style={{
            width: `${(1 - timeRate) * 100}%`,
            background: "var(--color-surface)",
          }}
        />
      </div>
      <div className="absolute bottom-3 left-0 right-0 mx-auto w-full h-2 rounded bg-(--color-surface) overflow-hidden border border-(--color-border)"></div>
      <div
        className="absolute bottom-3 left-0 h-2 rounded"
        style={{
          width: `${Math.min(100, spendRate * 100)}%`,
          background: color,
        }}
      />
      <div className="absolute inset-x-0 -bottom-1 text-[10px] text-center text-(--color-muted)">
        Spend vs time ({elapsedDays}/{daysInMonth}d)
      </div>
    </div>
  );
};

const MonthlyPacing = ({ extraAction, className = "" }) => {
  const { totalBudget, totalSpent, daysInMonth, elapsedDays } = useBudget();
  const [mode, setMode] = React.useState("summary");
  const spendRatePerDay = totalSpent / Math.max(1, elapsedDays);
  const projected = spendRatePerDay * daysInMonth;
  const variance = projected - totalBudget; // >0 over forecast
  const forecastPct = totalBudget ? (projected / totalBudget) * 100 : 0;
  const remainingDays = Math.max(0, daysInMonth - elapsedDays);
  const requiredDailyToStayOnBudget =
    (totalBudget - totalSpent) / Math.max(1, remainingDays);
  const danger = projected > totalBudget * 1.05;
  return (
    <div
      className={`glass border border-(--color-border) rounded-md p-5 flex flex-col ${className}`}
    >
      <div className="flex items-start justify-between mb-3 gap-3">
        <div>
          <h3 className="font-semibold text-base">Monthly pacing</h3>
          <span className="block text-[12px] text-(--color-muted)">
            {moment().format("MMM YYYY")}
          </span>
        </div>
        <div className="flex gap-2 items-start flex-wrap">
          <div className="flex gap-2 mb-2 md:mb-0">
            <button
              onClick={() => setMode("summary")}
              className={`px-2 py-1 rounded text-[11px] border border-(--color-border) ${
                mode === "summary"
                  ? "bg-(--color-accent) text-black font-semibold"
                  : "hover:border-(--color-accent)"
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setMode("forecast")}
              className={`px-2 py-1 rounded text-[11px] border border-(--color-border) ${
                mode === "forecast"
                  ? "bg-(--color-accent) text-black font-semibold"
                  : "hover:border-(--color-accent)"
              }`}
            >
              Forecast
            </button>
          </div>
          {extraAction && <div className="self-start">{extraAction}</div>}
        </div>
      </div>
      <PaceGauge
        spent={totalSpent}
        total={totalBudget}
        elapsedDays={elapsedDays}
        daysInMonth={daysInMonth}
      />
      {mode === "summary" && (
        <div className="grid grid-cols-3 gap-4 mt-4 text-[12px]">
          <div>
            <p className="text-(--color-muted)">Budget</p>
            <p className="font-semibold text-sm">{currency(totalBudget)}</p>
          </div>
          <div>
            <p className="text-(--color-muted)">Spent</p>
            <p className="font-semibold text-sm">{currency(totalSpent)}</p>
          </div>
          <div>
            <p className="text-(--color-muted)">Remain</p>
            <p className="font-semibold text-sm">
              {currency(Math.max(0, totalBudget - totalSpent))}
            </p>
          </div>
        </div>
      )}
      {mode === "forecast" && (
        <div className="mt-4 grid grid-cols-2 gap-4 text-[12px]">
          <div className="col-span-2 p-3 rounded bg-(--color-surface) flex items-center justify-between text-sm">
            <span>Projected spend</span>
            <span
              className={
                danger ? "text-red-400 font-semibold" : "font-semibold"
              }
            >
              {currency(projected)}
            </span>
          </div>
          <div className="p-3 rounded bg-(--color-surface)">
            <p className="text-(--color-muted)">Variance</p>
            <p
              className={
                variance > 0
                  ? "text-red-400 font-semibold"
                  : "text-emerald-400 font-semibold"
              }
            >
              {variance > 0 ? "+" : ""}
              {currency(variance)}
            </p>
          </div>
          <div className="p-3 rounded bg-(--color-surface)">
            <p className="text-(--color-muted)">Forecast %</p>
            <p
              className={
                forecastPct > 105
                  ? "text-red-400 font-semibold"
                  : "font-semibold"
              }
            >
              {forecastPct.toFixed(0)}%
            </p>
          </div>
          <div className="p-3 rounded bg-(--color-surface)">
            <p className="text-(--color-muted)">Daily avg</p>
            <p className="font-semibold">{currency(spendRatePerDay)}</p>
          </div>
          <div className="p-3 rounded bg-(--color-surface)">
            <p className="text-(--color-muted)">Need / day</p>
            <p className="font-semibold">
              {currency(requiredDailyToStayOnBudget)}
            </p>
          </div>
        </div>
      )}
      {danger && (
        <div className="mt-4 text-[11px] text-red-400">
          Projected overspend detected. Consider reducing discretionary
          categories.
        </div>
      )}
    </div>
  );
};

export default MonthlyPacing;
