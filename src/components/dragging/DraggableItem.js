// DraggableItem.js
import React from "react";

const DraggableItem = ({ id, position, children }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", id);
  };

  return (
    <div
      id={id}
      draggable="true"
      onDragStart={handleDragStart}
      style={{
        width: 100,
        height: 50,
        backgroundColor: "lightblue",
        cursor: "grab",
        display: "inline-block",
      }}
    >
      {children}
    </div>
  );
};

export default DraggableItem;
