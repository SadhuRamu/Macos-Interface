import React from "react";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { SalesChartCard } from "@/components/organisms/SalesChartCard";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground">
            Analyze your Kaggle retail data and keep track of your sales performance.
          </p>
        </div>
        
        <SalesChartCard />
        
        {/* Additional placeholder cards to make the dashboard look complete */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="font-semibold text-sm">Total Orders</h3>
            <div className="text-2xl font-bold mt-2">12,345</div>
            <p className="text-xs text-muted-foreground mt-1">+15% from last month</p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="font-semibold text-sm">Average Order Value</h3>
            <div className="text-2xl font-bold mt-2">$84.50</div>
            <p className="text-xs text-muted-foreground mt-1">+2% from last month</p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="font-semibold text-sm">Active Customers</h3>
            <div className="text-2xl font-bold mt-2">4,521</div>
            <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
