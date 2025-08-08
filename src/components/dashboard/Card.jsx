import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Decimal from "decimal.js";

const CardBackground = ({ className = "", children }) => {
  return (
    <div
      className={`flex justify-center items-center relative rounded-sm ${className}`}
    >
      <div className={"w-17 h-5 rounded-full bg-green-500"}></div>
      <div className="absolute inset-0 bg-white/15 backdrop-blur-xl rounded-sm">
        {children}
      </div>
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

  const formatValue = (value) => {
    if (value === undefined || value === null) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <CardBackground className={className}>
      <div className="flex flex-col p-4">
        <p className="text-sm text-gray-300">{title}</p>
        <p className="text-2xl mt-2">{formatValue(value)}</p>
        <div
          className={`flex items-center gap-1 text-sm font-semibold mt-1 ${sign ? "text-green-500" : "text-red-500"}`}
        >
          <FontAwesomeIcon icon={sign ? faCaretUp : faCaretDown} />
          <span>{formatPercent(percent)}</span>
        </div>
      </div>
    </CardBackground>
  );
};
