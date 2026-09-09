import React from "react";
import { Input } from "../atoms/Input";
import { Filter } from "lucide-react";

export interface FilterInputProps {
  value: string | number;
  onChange: (val: number) => void;
  placeholder?: string;
}

export function FilterInput({ value, onChange, placeholder = "Min Sales (e.g. 10000)" }: FilterInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        Sales Threshold
      </label>
      <div className="relative">
        <Input
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="pl-3"
        />
      </div>
    </div>
  );
}
