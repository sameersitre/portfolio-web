"use client";

// GitHub-style contribution heatmap: 7-row × N-week grid with month labels and a hover tooltip.

import { useState } from "react";
import type { ContributionDay, ContributionWeek } from "@/lib/github";
import { cn } from "@/lib/utils";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// One week column = 10px cell (w-2.5) + 3px gap (gap-0.75). Month labels are
// positioned on this pitch so they line up with the grid below.
const WEEK_PITCH_PX = 13;

const levelColors = {
  0: "bg-muted",
  1: "bg-amber-900/40",
  2: "bg-amber-700/60",
  3: "bg-amber-500/80",
  4: "bg-amber-400",
};

function ContributionTooltip({ day }: { day: ContributionDay }) {
  const date = new Date(day.date);
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className="pointer-events-none absolute -top-10 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-lg">
      {day.count} contribution{day.count !== 1 ? "s" : ""} on {formatted}
    </div>
  );
}

export function ContributionGrid({ weeks }: { weeks: ContributionWeek[] }) {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const firstDay = week.days[0];
    if (!firstDay) return;
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      monthLabels.push({ label: MONTHS[month], col: i });
      lastMonth = month;
    }
  });

  return (
    <div className="overflow-x-auto">
      <div className="min-w-180">
        {/* Month labels — absolutely positioned inside a relative track so each
            one sits exactly above its week column. The previous flow-based
            version double-counted the offset: the flex margins already advanced
            each label by `col * WEEK_PITCH_PX`, and `left` then added the same
            amount again, so labels drifted twice as far right as the grid and
            the year looked like it ended in April. */}
        <div className="mb-1 pl-8">
          <div className="relative h-4">
            {monthLabels.map(({ label, col }, i) => (
              <span
                key={`${label}-${i}`}
                className="absolute top-0 text-xs text-muted-foreground"
                style={{ left: `${col * WEEK_PITCH_PX}px` }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="flex gap-0.75">
          {/* Day labels */}
          <div className="flex flex-col justify-between gap-0.75 py-0.5">
            {["", "Mon", "", "Wed", "", "Fri", ""].map((day, i) => (
              <span
                key={i}
                className="h-2.5 text-[10px] leading-2.5 text-muted-foreground"
              >
                {day}
              </span>
            ))}
          </div>

          {/* Contribution cells */}
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.75">
              {week.days.map((day) => {
                // Filler cells (out-of-range alignment days) render dimly with
                // no hover handler and no tooltip — they aren't real data.
                if (!day.inRange) {
                  return (
                    <div
                      key={day.date}
                      className="h-2.5 w-2.5 rounded-xs bg-muted opacity-40"
                    />
                  );
                }
                return (
                  <div
                    key={day.date}
                    className="relative"
                    onMouseEnter={() => setHoveredDay(day.date)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    <div
                      className={cn(
                        "h-2.5 w-2.5 rounded-xs transition-all",
                        levelColors[day.level],
                        hoveredDay === day.date && "ring-1 ring-accent",
                      )}
                    />
                    {hoveredDay === day.date && (
                      <ContributionTooltip day={day} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-2 flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
          <span>Less</span>
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <div
              key={level}
              className={cn("h-2.5 w-2.5 rounded-xs", levelColors[level])}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
