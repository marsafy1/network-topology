import React from "react";

export default function Line({ line, handleClick }) {
  return (
    <line
      x1={line.x1}
      y1={line.y1}
      x2={line.x2}
      y2={line.y2}
      stroke="black"
      strokeWidth="2"
      onClick={handleClick}
      className="linking-line"
    />
  );
}
