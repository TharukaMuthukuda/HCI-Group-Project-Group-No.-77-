
import React, { useRef, useEffect, useState } from "react";
import { useRoom, FurnitureItem } from "@/context/RoomContext";
import { cn } from "@/lib/utils";

const RoomCanvas2D = () => {
  const { currentDesign, selectedFurnitureId, selectFurniture, updateFurniture } = useRoom();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<{ id: string; offsetX: number; offsetY: number } | null>(null);

  // Handle furniture selection
  const handleSelectFurniture = (id: string) => {
    selectFurniture(id);
  };

  // Handle furniture dragging
  const handleDragStart = (e: React.MouseEvent, furniture: FurnitureItem) => {
    if (!canvasRef.current) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const offsetX = e.clientX - canvasRect.left - furniture.position.x * 100;
    const offsetY = e.clientY - canvasRect.top - furniture.position.y * 100;
    
    setDragging({ id: furniture.id, offsetX, offsetY });
    selectFurniture(furniture.id);
    
    e.stopPropagation();
  };

  // Handle mouse move for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging || !canvasRef.current || !currentDesign) return;
      
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - canvasRect.left - dragging.offsetX) / 100;
      const y = (e.clientY - canvasRect.top - dragging.offsetY) / 100;
      
      // Ensure the furniture stays within room bounds
      const furniture = currentDesign.furniture.find(f => f.id === dragging.id);
      if (!furniture) return;
      
      const boundedX = Math.max(0, Math.min(currentDesign.width - furniture.width, x));
      const boundedY = Math.max(0, Math.min(currentDesign.length - furniture.depth, y));
      
      updateFurniture(dragging.id, {
        position: { x: boundedX, y: boundedY }
      });
    };

    const handleMouseUp = () => {
      if (dragging) {
        setDragging(null);
      }
    };

    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, currentDesign, updateFurniture]);

  // Handle canvas click to deselect furniture
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      selectFurniture(null);
    }
  };

  if (!currentDesign) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted/30 rounded-md">
        <p className="text-muted-foreground">Select or create a room design to start</p>
      </div>
    );
  }

  return (
    <div 
      ref={canvasRef}
      className="w-full h-full relative bg-roomvision-lightgray rounded-md overflow-hidden"
      onClick={handleCanvasClick}
      style={{
        width: `${currentDesign.width * 100}px`,
        height: `${currentDesign.length * 100}px`,
        backgroundColor: currentDesign.floorColor,
      }}
    >
      {/* Room walls */}
      <div 
        className="absolute inset-0 border-8 border-solid pointer-events-none"
        style={{ borderColor: currentDesign.wallColor }}
      />
      
      {/* Furniture items */}
      {currentDesign.furniture.map((furniture) => (
        <div
          key={furniture.id}
          className={cn(
            "absolute furniture-item",
            selectedFurnitureId === furniture.id && "furniture-selected"
          )}
          style={{
            left: `${furniture.position.x * 100}px`,
            top: `${furniture.position.y * 100}px`,
            width: `${furniture.width * 100}px`,
            height: `${furniture.depth * 100}px`,
            backgroundColor: furniture.color,
            transform: `rotate(${furniture.rotation}deg)`,
            cursor: "move",
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleSelectFurniture(furniture.id);
          }}
          onMouseDown={(e) => handleDragStart(e, furniture)}
        >
          <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium pointer-events-none">
            {furniture.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomCanvas2D;
