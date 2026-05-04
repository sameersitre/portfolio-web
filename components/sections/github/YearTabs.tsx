"use client";

// Header row above the contribution grid: total-contribution count + year selector tabs.

import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface YearTabsProps {
  availableYears: number[];
  selectedYear: number;
  onSelectYear: (year: number) => void;
  total: number;
}

export function YearTabs({
  availableYears,
  selectedYear,
  onSelectYear,
  total,
}: YearTabsProps) {
  return (
    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Flame size={16} className="text-accent" />
        <span className="text-sm font-medium text-foreground">
          {total.toLocaleString()} contributions in {selectedYear}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {availableYears.map((year) => (
          <button
            key={year}
            onClick={() => onSelectYear(year)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-all",
              selectedYear === year
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}
