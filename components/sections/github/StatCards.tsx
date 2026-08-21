"use client";

// Four-card row at the top of the GitHub section: contributions, repos, stars, followers.

import { motion } from "framer-motion";
import { Activity, BookOpen, Star, Users } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { GitHubStats } from "@/lib/github";

const container = staggerContainer(0.1);
const cardItem = fadeUp();

// Static definitions — does not change between renders.
const STAT_DEFINITIONS = [
  {
    key: "totalContributions",
    label: "Contributions",
    icon: <Activity size={18} />,
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "publicRepos",
    label: "Public Repos",
    icon: <BookOpen size={18} />,
    format: (v: number) => String(v),
  },
  {
    key: "totalStars",
    label: "Total Stars",
    icon: <Star size={18} />,
    format: (v: number) => String(v),
  },
  {
    key: "followers",
    label: "Followers",
    icon: <Users size={18} />,
    format: (v: number) => String(v),
  },
] as const satisfies ReadonlyArray<{
  key: keyof GitHubStats;
  label: string;
  icon: React.ReactNode;
  format: (v: number) => string;
}>;

export function StatCards({ stats }: { stats: GitHubStats }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
    >
      {STAT_DEFINITIONS.map(({ key, label, icon, format }) => (
        <motion.div
          key={label}
          variants={cardItem}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/30"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
            {icon}
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">
              {format(stats[key])}
            </div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
