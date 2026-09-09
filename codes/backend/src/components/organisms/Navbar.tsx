import React from "react";
import { Bell, Search, UserCircle } from "lucide-react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { Badge } from "../atoms/Badge";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 shadow-sm">
      <div className="flex flex-1 items-center gap-4">
        <form className="relative flex-1 md:max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search analytics..."
            className="w-full bg-background pl-9 md:w-[300px] lg:w-[400px]"
          />
        </form>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]">3</Badge>
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon">
          <UserCircle className="h-6 w-6" />
          <span className="sr-only">User account</span>
        </Button>
      </div>
    </header>
  );
}
