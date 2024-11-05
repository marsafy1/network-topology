import React from "react";
import DraggableItem from "../dragging/DraggableItem";
import SwitchImg from "../../assets/devices/switch.png";

export default function Switch({ id }) {
  return (
    <DraggableItem id={id}>
      <div className="device">
        <img src={SwitchImg} alt="Switch" />
        <div>Switch</div>
      </div>
    </DraggableItem>
  );
}
