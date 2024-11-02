// DropZone.js
import React, { useState } from "react";

const DropZone = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDragOver = (event) => {
    event.preventDefault(); // Allows dropping
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    setDroppedItems([data, ...droppedItems]);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        width: "100%",
        height: "100%",
        border: "2px dashed gray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {droppedItems ? `Dropped: ${droppedItems.length}` : "Drop here"}
    </div>
  );
};

export default DropZone;
