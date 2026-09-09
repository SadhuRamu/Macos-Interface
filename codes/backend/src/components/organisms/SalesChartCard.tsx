"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../atoms/Card";
import { FilterInput } from "../molecules/FilterInput";
import { ChartTypeSelector, ChartType } from "../molecules/ChartTypeSelector";
import { YearSelector, YearType } from "../molecules/YearSelector";
import { SalesDataPoint } from "@/app/api/sales/route";
import { Loader2 } from "lucide-react";

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#6366f1"];

export function SalesChartCard() {
  const [data, setData] = useState<SalesDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [yearFilter, setYearFilter] = useState<YearType>("all");
  const [minSalesFilter, setMinSalesFilter] = useState<number>(0);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/sales");
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  // Filter and format data based on user selections
  const processedData = useMemo(() => {
    if (!data.length) return [];

    // Filter by year
    const yearFiltered = yearFilter === "all" 
      ? data 
      : data.filter(d => d.year === yearFilter);

    // Filter by min sales
    const minSalesFiltered = minSalesFilter > 0 
      ? yearFiltered.filter(d => d.sales >= minSalesFilter) 
      : yearFiltered;

    // If 'all' years, we might want to aggregate by month
    if (yearFilter === "all") {
      const aggregated = minSalesFiltered.reduce((acc, curr) => {
        const existing = acc.find(d => d.month === curr.month);
        if (existing) {
          existing.sales += curr.sales;
        } else {
          acc.push({ ...curr });
        }
        return acc;
      }, [] as SalesDataPoint[]);
      
      // Ensure month order
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return aggregated.sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month));
    }

    return minSalesFiltered;
  }, [data, yearFilter, minSalesFilter]);

  const renderChart = () => {
    if (processedData.length === 0) {
      return (
        <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-muted-foreground/25">
          <p className="text-muted-foreground">No data available for the selected filters.</p>
        </div>
      );
    }

    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Sales"]}
              />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={processedData}
                dataKey="sales"
                nameKey="month"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={5}
                label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {processedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Sales"]} />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      case "bar":
      default:
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
              <Tooltip
                cursor={{ fill: "#f1f5f9" }}
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Sales"]}
              />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </RechartsBarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <Card className="w-full border-none shadow-md bg-white dark:bg-card">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8">
        <div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Revenue Analytics</CardTitle>
          <CardDescription>
            Interactive sales overview from 2022 to 2024.
          </CardDescription>
        </div>
        
        <div className="flex flex-wrap items-end gap-4 w-full md:w-auto bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
          <ChartTypeSelector value={chartType} onChange={setChartType} />
          <YearSelector value={yearFilter} onChange={setYearFilter} />
          <FilterInput value={minSalesFilter || ""} onChange={setMinSalesFilter} placeholder="Min Sales" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-destructive font-medium">{error}</p>
            </div>
          ) : (
            renderChart()
          )}
        </div>
      </CardContent>
    </Card>
  );
}
