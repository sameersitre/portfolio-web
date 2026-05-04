"use client";

// One pinned-repo card. Rendered inside a motion grid by the GitHub container.

import { motion } from "framer-motion";
import { ExternalLink, GitFork, Star } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { trackPinnedRepo } from "@/lib/analytics/events";
import { fadeUp } from "@/lib/animations";
import type { PinnedRepo } from "@/lib/github";

const cardItem = fadeUp();

export function PinnedRepoCard({ repo }: { repo: PinnedRepo }) {
  return (
    <motion.a
      variants={cardItem}
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackPinnedRepo(repo.name, repo.url)}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <GithubIcon size={16} className="text-muted-foreground" />
          <span className="font-semibold text-foreground transition-colors group-hover:text-accent">
            {repo.name}
          </span>
        </div>
        <ExternalLink
          size={14}
          className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        />
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
  );
}
