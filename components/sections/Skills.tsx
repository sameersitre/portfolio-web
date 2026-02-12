"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Layers,
  Palette,
  TestTube2,
  Activity,
  Plug,
  Bot,
  GitBranch,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/lib/data";

const categoryIcons: Record<string, React.ReactNode> = {
  Languages: <Code2 size={20} />,
  Frameworks: <Layers size={20} />,
  "UI & Styling": <Palette size={20} />,
  Testing: <TestTube2 size={20} />,
  Monitoring: <Activity size={20} />,
  Integrations: <Plug size={20} />,
  AI: <Bot size={20} />,
  DevOps: <GitBranch size={20} />,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading title="Skills" subtitle="Technologies I work with" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            variants={cardItem}
            className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                {categoryIcons[category.title]}
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                {category.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground transition-colors group-hover:text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
