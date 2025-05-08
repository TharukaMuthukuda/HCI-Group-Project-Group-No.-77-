
import React from "react";
import DesignsList from "./DesignsList";
import DesignControls from "./DesignControls";
import RoomCanvas2D from "./RoomCanvas2D";
import RoomCanvas3D from "./RoomCanvas3D";
import { useRoom } from "@/context/RoomContext";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

const Dashboard = () => {
  const { viewMode } = useRoom();

  return (
    <div className="flex-1 overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <DesignsList />
        </ResizablePanel>
        
        <ResizableHandle />
        
        <ResizablePanel defaultSize={60} minSize={40}>
          <div className="h-full p-4 flex items-center justify-center overflow-auto">
            <ScrollArea className="h-full w-full rounded-md border">
              {viewMode === "2d" ? <RoomCanvas2D /> : <RoomCanvas3D />}
            </ScrollArea>
          </div>
        </ResizablePanel>
        
        <ResizableHandle />
        
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <DesignControls />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Dashboard;
