import React from "react";

export default function Linkable({ children, handleClick }) {
  return <div onClick={handleClick}>{children}</div>;
}
