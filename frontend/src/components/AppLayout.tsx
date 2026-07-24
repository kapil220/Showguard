import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-canvas">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto bg-canvas">
        <Outlet />
      </main>
    </div>
  );
};
