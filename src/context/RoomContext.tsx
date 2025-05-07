import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

export type FurnitureItem = {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  rotation: number;
  width: number;
  height: number;
  depth: number;
  color: string;
  material: string;
};

export type RoomDesign = {
  id: string;
  name: string;
  width: number;
  length: number;
  height: number;
  wallColor: string;
  floorColor: string;
  furniture: FurnitureItem[];
  createdAt: Date;
  updatedAt: Date;
};

type RoomContextType = {
  designs: RoomDesign[];
  currentDesign: RoomDesign | null;
  createDesign: (design: Omit<RoomDesign, "id" | "createdAt" | "updatedAt">) => void;
  updateDesign: (id: string, design: Partial<RoomDesign>) => void;
  deleteDesign: (id: string) => void;
  selectDesign: (id: string) => void;
  addFurniture: (furniture: Omit<FurnitureItem, "id">) => void;
  updateFurniture: (id: string, furniture: Partial<FurnitureItem>) => void;
  deleteFurniture: (id: string) => void;
  selectedFurnitureId: string | null;
  selectFurniture: (id: string | null) => void;
  viewMode: "2d" | "3d";
  setViewMode: (mode: "2d" | "3d") => void;
  cartItems: FurnitureItem[];
  addToCart: (furniture: FurnitureItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const RoomContext = createContext<RoomContextType | undefined>(undefined);

// Sample furniture templates
export const FURNITURE_TEMPLATES = [
  {
    type: "dining_chair",
    name: "Dining Chair",
    width: 0.45,
    height: 0.95,
    depth: 0.5,
    color: "#8B4513",
    material: "wood",
  },
  {
    type: "dining_table",
    name: "Dining Table",
    width: 1.6,
    height: 0.75,
    depth: 0.9,
    color: "#A0522D",
    material: "wood",
  },
  {
    type: "sofa",
    name: "Living Room Sofa",
    width: 2.2,
    height: 0.85,
    depth: 0.95,
    color: "#696969",
    material: "fabric",
  },
  {
    type: "armchair",
    name: "Armchair",
    width: 0.85,
    height: 0.85,
    depth: 0.85,
    color: "#808080",
    material: "fabric",
  },
  {
    type: "coffee_table",
    name: "Coffee Table",
    width: 1.2,
    height: 0.45,
    depth: 0.6,
    color: "#8B4513",
    material: "wood",
  },
  {
    type: "bookshelf",
    name: "Bookshelf",
    width: 0.8,
    height: 2,
    depth: 0.35,
    color: "#D2B48C",
    material: "wood",
  },
  {
    type: "bed",
    name: "Double Bed",
    width: 1.6,
    height: 0.6,
    depth: 2,
    color: "#A0522D",
    material: "wood",
  },
  {
    type: "wardrobe",
    name: "Wardrobe",
    width: 1.2,
    height: 2,
    depth: 0.6,
    color: "#DEB887",
    material: "wood",
  },
];

// Sample room design
const SAMPLE_DESIGN: RoomDesign = {
  id: "sample-1",
  name: "Living Room Sample",
  width: 5,
  length: 4,
  height: 2.5,
  wallColor: "#F5F5F5",
  floorColor: "#D2B48C",
  furniture: [
    {
      id: "furniture-1",
      type: "sofa",
      name: "Sofa",
      position: { x: 0.5, y: 0.5 },
      rotation: 0,
      width: 2,
      height: 0.8,
      depth: 0.9,
      color: "#696969",
      material: "fabric",
    },
    {
      id: "furniture-2",
      type: "table",
      name: "Coffee Table",
      position: { x: 2, y: 1.5 },
      rotation: 0,
      width: 1.2,
      height: 0.45,
      depth: 0.6,
      color: "#8B4513",
      material: "wood",
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [designs, setDesigns] = useState<RoomDesign[]>([SAMPLE_DESIGN]);
  const [currentDesign, setCurrentDesign] = useState<RoomDesign | null>(null);
  const [selectedFurnitureId, setSelectedFurnitureId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  const [cartItems, setCartItems] = useState<FurnitureItem[]>([]);

  const createDesign = (design: Omit<RoomDesign, "id" | "createdAt" | "updatedAt">) => {
    const newDesign: RoomDesign = {
      ...design,
      id: `design-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setDesigns((prev) => [...prev, newDesign]);
    setCurrentDesign(newDesign);
    toast.success("New room design created!");
  };

  const updateDesign = (id: string, design: Partial<RoomDesign>) => {
    setDesigns((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, ...design, updatedAt: new Date() }
          : d
      )
    );
    
    if (currentDesign?.id === id) {
      setCurrentDesign((prev) => 
        prev ? { ...prev, ...design, updatedAt: new Date() } : prev
      );
    }
    
    toast.success("Room design updated!");
  };

  const deleteDesign = (id: string) => {
    setDesigns((prev) => prev.filter((d) => d.id !== id));
    
    if (currentDesign?.id === id) {
      setCurrentDesign(null);
    }
    
    toast.success("Room design deleted!");
  };

  const selectDesign = (id: string) => {
    const design = designs.find((d) => d.id === id) || null;
    setCurrentDesign(design);
    setSelectedFurnitureId(null);
  };

  const addFurniture = (furniture: Omit<FurnitureItem, "id">) => {
    if (!currentDesign) return;
    
    const newFurniture: FurnitureItem = {
      ...furniture,
      id: `furniture-${Date.now()}`,
    };
    
    const updatedDesign = {
      ...currentDesign,
      furniture: [...currentDesign.furniture, newFurniture],
      updatedAt: new Date(),
    };
    
    setCurrentDesign(updatedDesign);
    setDesigns((prev) =>
      prev.map((d) => (d.id === currentDesign.id ? updatedDesign : d))
    );
    
    toast.success(`Added ${furniture.name} to the room!`);
  };

  const updateFurniture = (id: string, furniture: Partial<FurnitureItem>) => {
    if (!currentDesign) return;
    
    const updatedFurniture = currentDesign.furniture.map((f) =>
      f.id === id ? { ...f, ...furniture } : f
    );
    
    const updatedDesign = {
      ...currentDesign,
      furniture: updatedFurniture,
      updatedAt: new Date(),
    };
    
    setCurrentDesign(updatedDesign);
    setDesigns((prev) =>
      prev.map((d) => (d.id === currentDesign.id ? updatedDesign : d))
    );
  };

  const deleteFurniture = (id: string) => {
    if (!currentDesign) return;
    
    const updatedFurniture = currentDesign.furniture.filter((f) => f.id !== id);
    
    const updatedDesign = {
      ...currentDesign,
      furniture: updatedFurniture,
      updatedAt: new Date(),
    };
    
    setCurrentDesign(updatedDesign);
    setDesigns((prev) =>
      prev.map((d) => (d.id === currentDesign.id ? updatedDesign : d))
    );
    
    if (selectedFurnitureId === id) {
      setSelectedFurnitureId(null);
    }
    
    toast.success("Furniture removed from the room!");
  };

  const selectFurniture = (id: string | null) => {
    setSelectedFurnitureId(id);
  };

  const addToCart = (furniture: FurnitureItem) => {
    setCartItems((prev) => [...prev, furniture]);
    toast.success(`Added ${furniture.name} to cart!`);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from cart!");
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared!");
  };

  return (
    <RoomContext.Provider
      value={{
        designs,
        currentDesign,
        createDesign,
        updateDesign,
        deleteDesign,
        selectDesign,
        addFurniture,
        updateFurniture,
        deleteFurniture,
        selectedFurnitureId,
        selectFurniture,
        viewMode,
        setViewMode,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
};
