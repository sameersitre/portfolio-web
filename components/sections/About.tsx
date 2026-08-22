"use client";

// About section: bio paragraphs, profile placeholder, and animated stats grid.

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { Stat } from "@/lib/portfolio";

interface Props {
  paragraphs: string[];
  stats: Stat[];
}

const statsContainer = staggerContainer(0.1, 0.2);
const statItem = fadeUp(0.5);

export function About({ paragraphs, stats }: Props) {
  return (
    <Section id="about">
      <SectionHeading title="About" subtitle="A few things about me" />

      <div className="grid gap-12 md:grid-cols-5">
        {/* Text — 3 columns */}
        <div className="space-y-4 text-muted-foreground md:col-span-3">
          {paragraphs.map((text) => (
            <p key={text.slice(0, 48)}>{text}</p>
          ))}
        </div>

        {/* Profile image placeholder — 2 columns */}
        <div className="flex items-start justify-center md:col-span-2">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-2xl bg-accent/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative h-64 w-64 overflow-hidden rounded-2xl border-2 border-border bg-muted transition-all duration-300 group-hover:border-accent/50">
              <div className="flex h-full items-center justify-center text-muted-foreground/40">
                <span className="text-5xl font-bold">SS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <motion.div
        variants={statsContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={statItem}
            className="rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-accent/30"
          >
            <div className="text-3xl font-bold text-accent">{stat.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
