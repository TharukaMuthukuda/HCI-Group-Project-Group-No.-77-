
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import RoomCanvas3D from "./RoomCanvas3D";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FullscreenViewerProps {
  open: boolean;
  onClose: () => void;
}

const FullscreenViewer = ({ open, onClose }: FullscreenViewerProps) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] flex flex-col">
        <DialogTitle className="text-lg font-semibold">3D Room View</DialogTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-4 top-4"
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="flex-1 rounded-lg border overflow-hidden mt-2">
          <RoomCanvas3D />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FullscreenViewer;
