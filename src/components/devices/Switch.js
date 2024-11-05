import React from "react";
import DraggableItem from "../dragging/DraggableItem";
export default function Switch({ id }) {
  return (
    <DraggableItem id={id}>
      <div>Switch</div>
    </DraggableItem>
  );
}
