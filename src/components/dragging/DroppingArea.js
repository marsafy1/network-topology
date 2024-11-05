// DropZone.js
import React, { useState, useEffect } from "react";
import Device from "../devices/Device";
import Router from "../devices/Router";
import Switch from "../devices/Switch";
import Linkable from "../interactions/Linkable";

const DropZone = () => {
  const [itemsIds, setItemsIds] = useState([]);
  const [visualItems, setVisualItems] = useState([]);
  const [dynamicField, setDynamicField] = useState({});
  const [lines, setLines] = useState([]);
  const [itemsCount, setItemsCount] = useState({
    router: 0,
    switch: 0,
    device: 0,
  });
  const [linkedElements, setLinkedelements] = useState([]); // will be pairs
  const [firstSelectedElement, setFirstSelectedElement] = useState(undefined);
  const [secondSelectedElement, setSecondSelectedElement] = useState(undefined);

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

      setLines([]);
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

  const handleClick = (id) => {
    console.log("Clicked ", id);

    if (!firstSelectedElement) {
      setFirstSelectedElement(id);
    } else if (!secondSelectedElement) {
      setSecondSelectedElement(id);
    }
  };

  const updateLines = () => {
    console.log(lines);
    linkedElements.forEach((line) => {
      console.log("Line #1", line[0]);
      console.log("Line #2", line[1]);
      handleNewLink(line[0], line[1]);
    });
  };

  const handleNewLink = (firstElemId, secondElemId) => {
    const firstElem = document.getElementById(firstElemId);
    const secondElem = document.getElementById(secondElemId);

    // Calculate the center points of each element
    const firstRect = firstElem.getBoundingClientRect();
    const secondRect = secondElem.getBoundingClientRect();

    const firstCenterX = firstRect.left + firstRect.width / 2;
    const firstCenterY = firstRect.top + firstRect.height / 2;
    const secondCenterX = secondRect.left + secondRect.width / 2;
    const secondCenterY = secondRect.top + secondRect.height / 2;

    // Use functional state update to add the new line
    setLines((prevLines) => [
      ...prevLines,
      {
        x1: firstCenterX,
        y1: firstCenterY,
        x2: secondCenterX,
        y2: secondCenterY,
      },
    ]);
  };

  useEffect(() => {
    console.log("Rebuilding");
    console.log(dynamicField);
    console.log(visualItems);
    console.log(itemsIds);
    updatePositions();
  }, [dynamicField]);

  useEffect(() => {
    if (lines.length === 0) {
      console.log("Redrawing");
      console.log(linkedElements);
      updateLines();
    }
  }, [lines]);

  useEffect(() => {
    if (firstSelectedElement && secondSelectedElement) {
      console.log(
        `Will link ${firstSelectedElement} with ${secondSelectedElement}`
      );
      setLinkedelements([
        ...linkedElements,
        [firstSelectedElement, secondSelectedElement],
      ]);
      handleNewLink(firstSelectedElement, secondSelectedElement);
      setFirstSelectedElement(undefined);
      setSecondSelectedElement(undefined);
    }
  }, [firstSelectedElement, secondSelectedElement]);

  useEffect(() => {
    console.log(linkedElements);
  }, [linkedElements]);
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
      {/* SVG to render the lines */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {lines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="black"
            strokeWidth="2"
          />
        ))}
      </svg>
      <div className="flex justify-around w-full p-4">
        {visualItems.map((item) => (
          <Linkable key={item.key} handleClick={() => handleClick(item.key)}>
            {item}
          </Linkable>
        ))}
      </div>
    </div>
  );
};

export default DropZone;
