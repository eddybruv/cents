import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Decimal from "decimal.js";
import { formatCurrency } from "../../lib/formatCurrency";

const CardBackground = ({ className = "", children }) => {
  return (
    <div
      className={`flex justify-center items-center relative rounded-sm ${className}`}
    >
      <div className={"w-17 h-5 rounded-full bg-(--color-accent)"}></div>
      <div className="absolute inset-0 glass rounded-sm">{children}</div>
    </div>
  );
};

export const Card = ({
  title = "Card Title",
  value = 0,
  percent = 0,
  className = "",
}) => {
  const sign = percent >= 0;

  const formatPercent = (percent) => {
    const value = new Decimal(percent).toFixed(2).toString() + "%";
    return value;
  };

  return (
    <CardBackground className={className}>
      <div className="flex flex-col p-4">
        <p className="text-sm text-(--color-muted)">{title}</p>
        <p className="text-2xl mt-2">{formatCurrency(value)}</p>
        <div
          className={`flex items-center gap-1 text-sm font-semibold mt-1 ${
            sign ? "text-(--color-accent)" : "text-red-500"
          }`}
        >
          <FontAwesomeIcon icon={sign ? faCaretUp : faCaretDown} />
          <span>{formatPercent(percent)}</span>
        </div>
      </div>
    </CardBackground>
  );
};
