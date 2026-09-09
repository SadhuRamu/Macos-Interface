import React from "react";
import { Select } from "../atoms/Select";
import { BarChart, LineChart, PieChart } from "lucide-react";

export type ChartType = "bar" | "line" | "pie";

export interface ChartTypeSelectorProps {
  value: ChartType;
  onChange: (val: ChartType) => void;
}

export function ChartTypeSelector({ value, onChange }: ChartTypeSelectorProps) {
  const options = [
    { label: "Bar Chart", value: "bar" },
    { label: "Line Chart", value: "line" },
    { label: "Pie Chart", value: "pie" },
  ];

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        {value === "bar" && <BarChart className="w-4 h-4 text-primary" />}
        {value === "line" && <LineChart className="w-4 h-4 text-primary" />}
        {value === "pie" && <PieChart className="w-4 h-4 text-primary" />}
        Visualization
      </label>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as ChartType)}
        options={options}
      />
    </div>
  );
}
