import React, { useState } from "react";
import { useRoom } from "@/context/RoomContext";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Plus, Eye, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DesignsList = () => {
  const { designs, selectDesign, createDesign, deleteDesign, currentDesign } = useRoom();
  const [newDesignName, setNewDesignName] = useState("");

  const handleCreateDesign = () => {
    createDesign({
      name: newDesignName || `Room Design ${designs.length + 1}`,
      width: 5,
      length: 4,
      height: 2.5,
      wallColor: "#F5F5F5",
      floorColor: "#D2B48C",
      furniture: [],
    });
    setNewDesignName("");
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">My Designs</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Design
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Room Design</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="roomName">Room Name</Label>
                  <Input
                    id="roomName"
                    placeholder="Living Room"
                    value={newDesignName}
                    onChange={(e) => setNewDesignName(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateDesign}>Create Design</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {designs.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No designs yet. Create your first room design!
            </p>
          ) : (
            designs.map((design) => (
              <Card 
                key={design.id} 
                className={currentDesign?.id === design.id ? "border-primary" : ""}
              >
                <CardHeader className="py-3">
                  <CardTitle className="text-base">{design.name}</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="text-sm text-muted-foreground">
                    <p>Size: {design.width}m × {design.length}m × {design.height}m</p>
                    <p>Furniture: {design.furniture.length} items</p>
                    <p className="text-xs">
                      Last updated: {new Date(design.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 pb-3">
                  <div className="flex gap-2 w-full">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => selectDesign(design.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => deleteDesign(design.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignsList;
