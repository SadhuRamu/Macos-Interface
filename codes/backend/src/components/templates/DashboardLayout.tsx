import React from "react";
import { Sidebar } from "../organisms/Sidebar";
import { Navbar } from "../organisms/Navbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background md:flex-row">
      <Sidebar />
      <div className="flex flex-1 flex-col sm:gap-4 sm:py-0">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
