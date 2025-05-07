
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Room Vision Designer</h1>
        </div>
        
        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-muted w-8 h-8 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <span className="font-medium">{user.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
