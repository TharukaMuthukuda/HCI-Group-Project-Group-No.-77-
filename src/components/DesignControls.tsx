import React, { useState } from "react";
import { useRoom } from "@/context/RoomContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FURNITURE_TEMPLATES } from "@/context/RoomContext";
import {
  Trash2,
  Undo2,
  RotateCw,
  PlusCircle,
  Save,
  Edit,
  Square,
  Palette,
  Move,
  Box,
  ShoppingCart,
  Eye,
  Package,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import FullscreenViewer from "./FullscreenViewer";
import { toast } from "sonner";

const DesignControls = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const {
    currentDesign,
    selectedFurnitureId,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    viewMode,
    setViewMode,
    updateDesign,
    deleteDesign,
    updateFurniture,
    selectFurniture,
    deleteFurniture,
    addFurniture
  } = useRoom();

  const selectedFurniture = currentDesign?.furniture.find(
    (f) => f.id === selectedFurnitureId
  );

  if (!currentDesign) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted/30 rounded-md">
        <p className="text-muted-foreground">
          Select or create a room design to start
        </p>
      </div>
    );
  }

  const handleRotateLeft = () => {
    if (selectedFurniture) {
      updateFurniture(selectedFurniture.id, {
        rotation: (selectedFurniture.rotation - 90) % 360
      });
    }
  };

  const handleRotateRight = () => {
    if (selectedFurniture) {
      updateFurniture(selectedFurniture.id, {
        rotation: (selectedFurniture.rotation + 90) % 360
      });
    }
  };

  return (
    <Card className="w-full h-full flex flex-col bg-card/95 backdrop-blur-sm border-2">
      <CardHeader className="pb-2 space-y-0">
        <CardTitle className="font-semibold tracking-tight flex items-center gap-2">
          <Edit className="w-5 h-5" />
          Design Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4">
        <Tabs defaultValue="room" className="flex-1 flex flex-col">
          <TabsList className="w-full grid grid-cols-5 mb-4">
            <TabsTrigger value="room" className="gap-2">
              <Square className="w-4 h-4" />
              Room
            </TabsTrigger>
            <TabsTrigger value="furniture" disabled={!selectedFurniture} className="gap-2">
              <Box className="w-4 h-4" />
              Furniture
            </TabsTrigger>
            <TabsTrigger value="add" className="gap-2">
              <PlusCircle className="w-4 h-4" />
              Add
            </TabsTrigger>
            <TabsTrigger value="view" className="gap-2">
              <Eye className="w-4 h-4" />
              View
            </TabsTrigger>
            <TabsTrigger value="cart" className="gap-2 relative">
              <ShoppingCart className="w-4 h-4" />
              Cart
              {cartItems.length > 0 && (
                <Badge variant="secondary" className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <ScrollArea className="flex-1 -mx-2 px-2">
            <div className="space-y-6">
              <TabsContent value="room" className="m-0">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="width">Width (m)</Label>
                      <Input
                        type="number"
                        id="width"
                        value={currentDesign.width}
                        onChange={(e) =>
                          updateDesign(currentDesign.id, {
                            width: parseFloat(e.target.value),
                          })
                        }
                        className="focus-visible:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="length">Length (m)</Label>
                      <Input
                        type="number"
                        id="length"
                        value={currentDesign.length}
                        onChange={(e) =>
                          updateDesign(currentDesign.id, {
                            length: parseFloat(e.target.value),
                          })
                        }
                        className="focus-visible:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (m)</Label>
                      <Input
                        type="number"
                        id="height"
                        value={currentDesign.height}
                        onChange={(e) =>
                          updateDesign(currentDesign.id, {
                            height: parseFloat(e.target.value),
                          })
                        }
                        className="focus-visible:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="wallColor">Wall Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          id="wallColor"
                          value={currentDesign.wallColor}
                          onChange={(e) =>
                            updateDesign(currentDesign.id, {
                              wallColor: e.target.value,
                            })
                          }
                          className="w-12 h-12 p-1 rounded-lg cursor-pointer"
                        />
                        <div className="flex-1 rounded-md" style={{ backgroundColor: currentDesign.wallColor }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="floorColor">Floor Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          id="floorColor"
                          value={currentDesign.floorColor}
                          onChange={(e) =>
                            updateDesign(currentDesign.id, {
                              floorColor: e.target.value,
                            })
                          }
                          className="w-12 h-12 p-1 rounded-lg cursor-pointer"
                        />
                        <div className="flex-1 rounded-md" style={{ backgroundColor: currentDesign.floorColor }} />
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="destructive"
                    onClick={() => deleteDesign(currentDesign.id)}
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Room
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="furniture" className="m-0">
                {selectedFurniture && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="furnitureName">Name</Label>
                        <Input
                          type="text"
                          id="furnitureName"
                          value={selectedFurniture.name}
                          onChange={(e) =>
                            updateFurniture(selectedFurniture.id, {
                              name: e.target.value,
                            })
                          }
                          className="focus-visible:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="furnitureType">Type</Label>
                        <Input
                          type="text"
                          id="furnitureType"
                          value={selectedFurniture.type}
                          onChange={(e) =>
                            updateFurniture(selectedFurniture.id, {
                              type: e.target.value,
                            })
                          }
                          className="focus-visible:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="furnitureWidth">Width (m)</Label>
                        <Input
                          type="number"
                          id="furnitureWidth"
                          value={selectedFurniture.width}
                          onChange={(e) =>
                            updateFurniture(selectedFurniture.id, {
                              width: parseFloat(e.target.value),
                            })
                          }
                          className="focus-visible:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="furnitureHeight">Height (m)</Label>
                        <Input
                          type="number"
                          id="furnitureHeight"
                          value={selectedFurniture.height}
                          onChange={(e) =>
                            updateFurniture(selectedFurniture.id, {
                              height: parseFloat(e.target.value),
                            })
                          }
                          className="focus-visible:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="furnitureDepth">Depth (m)</Label>
                        <Input
                          type="number"
                          id="furnitureDepth"
                          value={selectedFurniture.depth}
                          onChange={(e) =>
                            updateFurniture(selectedFurniture.id, {
                              depth: parseFloat(e.target.value),
                            })
                          }
                          className="focus-visible:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="furnitureRotation">Rotation (°)</Label>
                      <Slider
                        id="furnitureRotation"
                        defaultValue={[selectedFurniture.rotation]}
                        max={360}
                        step={1}
                        onValueChange={(value) =>
                          updateFurniture(selectedFurniture.id, {
                            rotation: value[0],
                          })
                        }
                        className="py-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="furnitureColor">Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          id="furnitureColor"
                          value={selectedFurniture.color}
                          onChange={(e) =>
                            updateFurniture(selectedFurniture.id, {
                              color: e.target.value,
                            })
                          }
                          className="w-12 h-12 p-1 rounded-lg cursor-pointer"
                        />
                        <div className="flex-1 rounded-md" style={{ backgroundColor: selectedFurniture.color }} />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={() => selectFurniture(null)} className="flex-1">
                        <Undo2 className="w-4 h-4 mr-2" />
                        Deselect
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          addToCart(selectedFurniture);
                          selectFurniture(null);
                        }}
                        className="flex-1"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => deleteFurniture(selectedFurniture.id)}
                        className="flex-1"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="add" className="m-0">
                <Select onValueChange={(value) => {
                  const template = FURNITURE_TEMPLATES.find((t) => t.type === value);
                  if (template) {
                    addFurniture({
                      ...template,
                      name: template.name,
                      position: { x: 0, y: 0 },
                      rotation: 0,
                    });
                  }
                }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a furniture template" />
                  </SelectTrigger>
                  <SelectContent>
                    {FURNITURE_TEMPLATES.map((template) => (
                      <SelectItem key={template.type} value={template.type}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>

              <TabsContent value="view" className="m-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Label className="min-w-20">View Mode</Label>
                    <Select value={viewMode} onValueChange={setViewMode}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2d">
                          <span className="flex items-center gap-2">
                            <Square className="w-4 h-4" />
                            2D View
                          </span>
                        </SelectItem>
                        <SelectItem value="3d">
                          <span className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            3D View
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {viewMode === "3d" && (
                    <Button 
                      onClick={() => setIsFullscreen(true)} 
                      className="w-full"
                      variant="outline"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View in Fullscreen
                    </Button>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="cart" className="m-0">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    Your cart is empty
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.width}m × {item.depth}m × {item.height}m
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                    <Separator className="my-4" />
                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={clearCart} className="flex-1">
                        Clear Cart
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={() => {
                          toast("Coming Soon!", {
                            description: "Purchase functionality will be available soon.",
                          })
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Purchase ({cartItems.length})
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </CardContent>
      <FullscreenViewer 
        open={isFullscreen} 
        onClose={() => setIsFullscreen(false)} 
      />
    </Card>
  );
};

export default DesignControls;
