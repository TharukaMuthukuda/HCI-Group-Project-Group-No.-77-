
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { RoomProvider } from "@/context/RoomContext";
import LoginForm from "@/components/LoginForm";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {isAuthenticated ? (
        <RoomProvider>
          <Dashboard />
        </RoomProvider>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <LoginForm />
        </div>
      )}
    </div>
  );
};

export default Index;
