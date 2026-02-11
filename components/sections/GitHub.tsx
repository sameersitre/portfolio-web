"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink, Users, BookOpen, Activity, Flame } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getGitHubStats, getContributionsForYear, getAvailableYears } from "@/lib/github";
import type { ContributionDay, ContributionWeek } from "@/lib/github";
import { cn } from "@/lib/utils";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const levelColors = {
  0: "bg-muted",
  1: "bg-amber-900/40",
  2: "bg-amber-700/60",
  3: "bg-amber-500/80",
  4: "bg-amber-400",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
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

function ContributionGrid({ weeks }: { weeks: ContributionWeek[] }) {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  const monthLabels = useMemo(() => {
    const labels: { label: string; col: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const firstDay = week.days[0];
      if (!firstDay) return;
      const month = new Date(firstDay.date).getMonth();
      if (month !== lastMonth) {
        labels.push({ label: MONTHS[month], col: i });
        lastMonth = month;
      }
    });
    return labels;
  }, [weeks]);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[720px]">
        {/* Month labels */}
        <div className="mb-1 flex pl-8">
          {monthLabels.map(({ label, col }, i) => (
            <span
              key={`${label}-${i}`}
              className="text-xs text-muted-foreground"
              style={{
                position: "relative",
                left: `${col * 13}px`,
                marginRight: i < monthLabels.length - 1 ? `${((monthLabels[i + 1]?.col ?? col) - col) * 13 - 24}px` : 0,
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="flex gap-[3px]">
          {/* Day labels */}
          <div className="flex flex-col justify-between py-[2px]" style={{ gap: "3px" }}>
            {["", "Mon", "", "Wed", "", "Fri", ""].map((day, i) => (
              <span key={i} className="h-[10px] text-[10px] leading-[10px] text-muted-foreground">
                {day}
              </span>
            ))}
          </div>

          {/* Contribution cells */}
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col" style={{ gap: "3px" }}>
              {week.days.map((day) => (
                <div
                  key={day.date}
                  className="relative"
                  onMouseEnter={() => setHoveredDay(day.date)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  <div
                    className={cn(
                      "h-[10px] w-[10px] rounded-[2px] transition-all",
                      levelColors[day.level],
                      hoveredDay === day.date && "ring-1 ring-accent"
                    )}
                  />
                  {hoveredDay === day.date && <ContributionTooltip day={day} />}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-2 flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
          <span>Less</span>
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <div
              key={level}
              className={cn("h-[10px] w-[10px] rounded-[2px]", levelColors[level])}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

function ContributionGraph() {
  const availableYears = useMemo(() => getAvailableYears(), []);
  const [selectedYear, setSelectedYear] = useState(availableYears[0]);
  const yearData = useMemo(() => getContributionsForYear(selectedYear), [selectedYear]);

  return (
    <div>
      {/* Year selector + contribution count */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Flame size={16} className="text-accent" />
          <span className="text-sm font-medium text-foreground">
            {yearData.total.toLocaleString()} contributions in {selectedYear}
          </span>
        </div>

        {/* Year tabs */}
        <div className="flex flex-wrap gap-1.5">
          {availableYears.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-all",
                selectedYear === year
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <ContributionGrid weeks={yearData.weeks} />
    </div>
  );
}

export function GitHub() {
  const { stats, pinnedRepos } = useMemo(() => getGitHubStats(), []);

  const statCards = [
    { label: "Contributions", value: stats.totalContributions.toLocaleString(), icon: <Activity size={18} /> },
    { label: "Public Repos", value: stats.publicRepos, icon: <BookOpen size={18} /> },
    { label: "Total Stars", value: stats.totalStars, icon: <Star size={18} /> },
    { label: "Followers", value: stats.followers, icon: <Users size={18} /> },
  ];

  return (
    <Section id="github">
      <SectionHeading title="GitHub" subtitle="My open source activity" />

      {/* Stats row */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {statCards.map((stat) => (
          <motion.div
            key={stat.label}
            variants={cardItem}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/30"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              {stat.icon}
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Contribution graph with year selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className="mb-10 rounded-xl border border-border bg-card p-6"
      >
        <ContributionGraph />
      </motion.div>

      {/* Pinned repos */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {pinnedRepos.map((repo) => (
          <motion.a
            key={repo.name}
            variants={cardItem}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Github size={16} className="text-muted-foreground" />
                <span className="font-semibold text-foreground transition-colors group-hover:text-accent">
                  {repo.name}
                </span>
              </div>
              <ExternalLink size={14} className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <p className="mt-2 flex-1 text-sm text-muted-foreground">
              {repo.description}
            </p>

            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: repo.languageColor }}
                />
                {repo.language}
              </span>
              <span className="flex items-center gap-1">
                <Star size={12} />
                {repo.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitFork size={12} />
                {repo.forks}
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <a
          href="https://github.com/sameersitre"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <Github size={16} />
          View Full Profile on GitHub
        </a>
      </div>
    </Section>
  );
}
