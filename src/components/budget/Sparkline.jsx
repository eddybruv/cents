import React from "react";

const Sparkline = ({ points, color }) => {
  if (!points.length) return <div className="h-10" />;
  const w = 100,
    h = 30;
  const max = Math.max(...points.map((p) => p.total));
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - (p.total / max) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-8">
      <path d={path} fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
};

export default Sparkline;
