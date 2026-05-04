"use client";

// GitHub section orchestrator: stat cards, year selector + contribution heatmap,
// pinned repos grid, and a "view full profile" CTA. Owns the selectedYear state.

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContributionGrid } from "@/components/sections/github/ContributionGrid";
import { PinnedRepoCard } from "@/components/sections/github/PinnedRepoCard";
import { StatCards } from "@/components/sections/github/StatCards";
import { YearTabs } from "@/components/sections/github/YearTabs";
import {
  trackGithubProfileView,
  trackYearFilter,
} from "@/lib/analytics/events";
import { EASE_OUT, staggerContainer } from "@/lib/animations";
import type { GitHubData } from "@/lib/github";
import { siteConfig } from "@/lib/site-config";

const repoGridContainer = staggerContainer(0.1);

export function GitHub({ data }: { data: GitHubData }) {
  const { stats, pinnedRepos, years, availableYears } = data;
  const [selectedYear, setSelectedYear] = useState(availableYears[0]);
  const yearData = years.find((y) => y.year === selectedYear) ?? years[0];

  return (
    <Section id="github">
      <SectionHeading title="GitHub" subtitle="My open source activity" />

      <StatCards stats={stats} />

      {/* Contribution graph with year selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="mb-10 rounded-xl border border-border bg-card p-6"
      >
        <YearTabs
          availableYears={availableYears}
          selectedYear={selectedYear}
          onSelectYear={(year) => {
            setSelectedYear(year);
            trackYearFilter(year);
          }}
          total={yearData.total}
        />
        <ContributionGrid weeks={yearData.weeks} />
      </motion.div>

      {/* Pinned repos */}
      <motion.div
        variants={repoGridContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {pinnedRepos.map((repo) => (
          <PinnedRepoCard key={repo.name} repo={repo} />
        ))}
      </motion.div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackGithubProfileView()}
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <GithubIcon size={16} />
          View Full Profile on GitHub
        </a>
      </div>
    </Section>
  );
}
