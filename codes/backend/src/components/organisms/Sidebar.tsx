import React from "react";
import Link from "next/link";
import { LayoutDashboard, ShoppingCart, Users, Settings, Package, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../atoms/Badge";

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("hidden w-64 flex-col border-r bg-card md:flex", className)}>
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary tracking-tight">
          <LineChart className="h-6 w-6" />
          <span>KaggleRetail</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-4 text-sm font-medium">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all hover:text-accent-foreground"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent/50 hover:text-accent-foreground"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="flex-1">Orders</span>
            <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">Coming Soon</Badge>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent/50 hover:text-accent-foreground"
          >
            <Package className="h-4 w-4" />
            <span className="flex-1">Products</span>
            <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">Coming Soon</Badge>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent/50 hover:text-accent-foreground"
          >
            <Users className="h-4 w-4" />
            <span className="flex-1">Customers</span>
            <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">Coming Soon</Badge>
          </Link>
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <nav className="grid gap-1 px-2 text-sm font-medium">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent/50 hover:text-accent-foreground"
          >
            <Settings className="h-4 w-4" />
            <span className="flex-1">Settings</span>
            <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">Coming Soon</Badge>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
