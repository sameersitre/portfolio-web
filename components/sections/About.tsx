"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stats = [
  { value: "7+", label: "Years Experience" },
  { value: "3", label: "Companies" },
  { value: "20+", label: "Production Releases" },
  { value: "1000s", label: "Users Served" },
];

const statsContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const statItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function About() {
  return (
    <Section id="about">
      <SectionHeading title="About" subtitle="A few things about me" />

      <div className="grid gap-12 md:grid-cols-5">
        {/* Text — 3 columns */}
        <div className="space-y-4 text-muted-foreground md:col-span-3">
          <p>
            I&apos;m a software engineer who loves building products that people
            actually use. With 7+ years in the industry, I&apos;ve shipped
            production features to thousands of users across global markets.
          </p>
          <p>
            My expertise spans web and mobile development — from design system
            architecture and performance optimisation to end-to-end test
            automation and security hardening. I&apos;ve led UI library
            migrations, built real-time chat systems, and orchestrated 20+
            production releases across multiple engineering teams.
          </p>
          <p>
            Currently at <span className="text-accent">The Real Brokerage</span>,
            I work across both web (React + TypeScript) and mobile (React Native)
            platforms. I&apos;m passionate about AI-driven development workflows
            and building tools that make developers more productive.
          </p>
          <p>
            When I&apos;m not coding, you&apos;ll find me cycling, playing
            chess, or exploring the latest in AI and open source.
          </p>
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
