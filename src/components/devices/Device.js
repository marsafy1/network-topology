import React from "react";
import DraggableItem from "../dragging/DraggableItem";
import Linkable from "../interactions/Linkable";

export default function Device({ id }) {
  return (
    <DraggableItem id={id}>
      <div>Device</div>
    </DraggableItem>
  );
}
