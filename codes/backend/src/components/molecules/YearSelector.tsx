import React from "react";
import { Select } from "../atoms/Select";
import { Calendar } from "lucide-react";

export type YearType = 2022 | 2023 | 2024 | "all";

export interface YearSelectorProps {
  value: YearType;
  onChange: (val: YearType) => void;
}

export function YearSelector({ value, onChange }: YearSelectorProps) {
  const options = [
    { label: "All Years", value: "all" },
    { label: "2024", value: 2024 },
    { label: "2023", value: 2023 },
    { label: "2022", value: 2022 },
  ];

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        Select Year
      </label>
      <Select
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === "all" ? "all" : Number(val) as YearType);
        }}
        options={options}
      />
    </div>
  );
}
