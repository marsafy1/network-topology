import React from "react";
import DraggableItem from "../dragging/DraggableItem";
import ComputerImg from "../../assets/devices/endpoint.png";

export default function Device({ id }) {
  return (
    <DraggableItem id={id}>
      <div className="device">
        <img src={ComputerImg} alt="Endpoint" />
        <div>Endpoint</div>
      </div>
    </DraggableItem>
  );
}
