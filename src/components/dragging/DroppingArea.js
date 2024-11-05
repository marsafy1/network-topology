// DropZone.js
import React, { useState, useEffect } from "react";
import Device from "../devices/Device";
import Router from "../devices/Router";
import Switch from "../devices/Switch";

const DropZone = () => {
  const [itemsIds, setItemsIds] = useState([]);
  const [visualItems, setVisualItems] = useState([]);
  const [itemsCount, setItemsCount] = useState({
    router: 0,
    switch: 0,
    device: 0,
  });
  const [dynamicField, setDynamicField] = useState({});

  const handleDragOver = (event) => {
    event.preventDefault(); // Allows dropping
  };

  const generateComponent = (componentType) => {
    const count = itemsCount[componentType];
    const identifier = `${componentType}-${count}`;

    setItemsIds([...itemsIds, identifier]);

    let updatedDynamicField = { ...dynamicField };
    updatedDynamicField[identifier] = {
      left: 0,
      top: 0,
    };
    setDynamicField(updatedDynamicField);

    return createVisualComponent(componentType, identifier);
  };

  const createVisualComponent = (componentType, identifier) => {
    // Use the updatedDynamicField to access the position directly
    const position = dynamicField[identifier] || { left: 0, top: 0 };

    switch (componentType) {
      case "router":
        return <Router key={identifier} id={identifier} position={position} />;
      case "switch":
        return <Switch key={identifier} id={identifier} position={position} />;
      case "device":
        return <Device key={identifier} id={identifier} position={position} />;
      default:
        return null;
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const elementId = event.dataTransfer.getData("text/plain");

    if (elementId.includes("default")) {
      handleNewItemGeneration(elementId);
    } else {
      // Re-position
      console.log("Repositioning...");
      console.log(event);
      const rect = event.target.getBoundingClientRect();

      const offsetX = event.clientX - rect.x;
      const offsetY = event.clientY - rect.y;
      console.log("X, ", offsetX);
      console.log("Y, ", offsetY);

      let updatedDynamicField = { ...dynamicField };
      updatedDynamicField[elementId] = {
        left: offsetX,
        top: offsetY,
      };
      setDynamicField(updatedDynamicField);

      console.log(dynamicField);
    }
  };

  const handleNewItemGeneration = (elementId) => {
    // Get the component type
    const componentType = elementId.split("-")[1];

    // Update the itemsCount
    const updatedItemsCount = {
      ...itemsCount,
      [componentType]: (itemsCount[componentType] || 0) + 1,
    };
    setItemsCount(updatedItemsCount);

    // Generate the component with the updated count
    const newComponent = generateComponent(componentType);

    // Add the new component to visualItems
    setVisualItems([newComponent, ...visualItems]);
  };

  const rebuildComponents = () => {
    itemsIds.forEach((identifier) => {
      // Generate the component with the updated count
      const newComponent = createVisualComponent(
        identifier.split("-")[0],
        identifier
      );

      // Add the new component to visualItems
      setVisualItems([newComponent, ...visualItems]);
    });
  };

  const updatePositions = () => {
    Object.keys(dynamicField).forEach((itemId) => {
      const coordinates = dynamicField[itemId];
      const element = document.getElementById(itemId);

      if (element) {
        // Ensure the element exists
        console.log("Cx:", coordinates["left"]);
        console.log("Cy:", coordinates["top"]);
        element.style.position = "absolute";
        element.style.left = `${coordinates["left"]}px`; // Add px for units
        element.style.top = `${coordinates["top"]}px`; // Add px for units
      } else {
        console.warn(`Element with ID ${itemId} not found.`);
      }
    });
  };

  useEffect(() => {
    console.log("Rebuilding");
    console.log(dynamicField);
    updatePositions();
  }, [dynamicField]);

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        border: "2px dashed gray",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {/* <div>{visualItems ? `Dropped: ${visualItems.length}` : "Drop here"}</div> */}
      <div className="flex justify-around w-full p-4">
        {visualItems.map((item) => item)}
      </div>
    </div>
  );
};

export default DropZone;
