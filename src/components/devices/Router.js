import React from "react";
import DraggableItem from "../dragging/DraggableItem";
export default function Router({ id }) {
  return (
    <DraggableItem id={id}>
      <div>Router</div>
    </DraggableItem>
  );
}
