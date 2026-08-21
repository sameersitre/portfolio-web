"use client";

// Projects section: filter tabs + animated grid of project cards.

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Folder } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { trackProject, trackProjectFilter } from "@/lib/analytics/events";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { Project } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

interface Props {
  projects: Project[];
}

const filters = ["All", "Web", "Mobile", "Library"] as const;
type Filter = (typeof filters)[number];

const container = staggerContainer(0.1);
const cardItem = fadeUp(0.5);

export function Projects({ projects }: Props) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <Section id="projects">
      <SectionHeading title="Projects" subtitle="Things I've built" />

      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setActiveFilter(filter);
              trackProjectFilter(filter);
            }}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              activeFilter === filter
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <motion.div
        key={activeFilter}
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredProjects.map((project) => {
          const githubUrl = project.githubUrl;
          const liveUrl = project.liveUrl;
          return (
          <motion.div
            key={project.title}
            variants={cardItem}
            layout
            className="group flex flex-col rounded-xl border border-border bg-card transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          >
            {/* Card header with icon */}
            <div className="flex items-start justify-between p-6 pb-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Folder size={22} />
              </div>

              <div className="flex items-center gap-3">
                {githubUrl ? (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackProject(project.title, "source", githubUrl)
                    }
                    className="text-muted-foreground transition-colors hover:text-accent"
                    aria-label={`${project.title} GitHub`}
                  >
                    <GithubIcon size={18} />
                  </a>
                ) : null}
                {liveUrl ? (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackProject(project.title, "demo", liveUrl)
                    }
                    className="text-muted-foreground transition-colors hover:text-accent"
                    aria-label={`${project.title} live demo`}
                  >
                    <ExternalLink size={18} />
                  </a>
                ) : null}
              </div>
            </div>

            {/* Card body */}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Category badge */}
            <div className="border-t border-border px-6 py-3">
              <span className="text-xs font-medium text-muted-foreground">
                {project.category}
              </span>
            </div>
          </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
