import React from "react";
import Switch from "./devices/Switch";
import Router from "./devices/Router";
import Device from "./devices/Device";

export default function Dock() {
  return (
    <div className="flex justify-start w-full p-2 border-2 space-x-4">
      <Switch id="default-switch" />
      <Router id="default-router" />
      <Device id="default-device" />
    </div>
  );
}
