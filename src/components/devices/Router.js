import React from "react";
import DraggableItem from "../dragging/DraggableItem";
import RouterImg from "../../assets/devices/router.png";

export default function Router({ id }) {
  return (
    <DraggableItem id={id}>
      <div className="device">
        <img src={RouterImg} alt="Router" />
        <div>Router</div>
      </div>
    </DraggableItem>
  );
}
