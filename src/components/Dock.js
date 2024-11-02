import React from "react";
import Switch from "./devices/Switch";
import Router from "./devices/Router";
import Device from "./devices/Device";

export default function Dock() {
  return (
    <div className="flex justify-between items-center w-full p-2 border-2">
      <Switch />
      <Router />
      <Device />
    </div>
  );
}
