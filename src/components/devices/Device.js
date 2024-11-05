import React from "react";
import DraggableItem from "../dragging/DraggableItem";
export default function Device({ id }) {
  return (
    <DraggableItem id={id}>
      <div>Device</div>
    </DraggableItem>
  );
}
