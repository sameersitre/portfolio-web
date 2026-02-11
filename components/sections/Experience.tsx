"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, ChevronDown } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <Section id="experience">
      <SectionHeading title="Experience" subtitle="Where I've worked" />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:left-8 md:block" />

        <div className="space-y-6">
          {experiences.map((exp, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut" as const,
                }}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-2 top-6 hidden h-5 w-5 rounded-full border-2 md:left-[1.375rem] md:block",
                    isExpanded
                      ? "border-accent bg-accent/20"
                      : "border-border bg-background"
                  )}
                />

                {/* Card */}
                <div
                  className={cn(
                    "rounded-xl border transition-all duration-300",
                    isExpanded
                      ? "border-accent/30 bg-card shadow-lg shadow-accent/5"
                      : "border-border bg-card hover:border-accent/20"
                  )}
                >
                  {/* Header — always visible */}
                  <button
                    onClick={() =>
                      setExpandedIndex(isExpanded ? -1 : index)
                    }
                    className="flex w-full items-start justify-between p-6 text-left"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {exp.role}
                        </h3>
                        <span className="text-lg text-accent">@</span>
                        <span className="text-lg font-semibold text-accent">
                          {exp.company}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase size={14} />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {exp.location} · {exp.type}
                        </span>
                      </div>
                    </div>

                    <ChevronDown
                      size={20}
                      className={cn(
                        "mt-1 shrink-0 text-muted-foreground transition-transform duration-300",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Expandable content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" as const }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-6 px-6 pb-6">
                          {exp.highlights.map((highlight) => (
                            <div key={highlight.category}>
                              <h4 className="mb-3 text-sm font-semibold text-foreground">
                                {highlight.category}
                              </h4>
                              <ul className="space-y-2">
                                {highlight.items.map((item, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      delay: i * 0.05,
                                      ease: "easeOut" as const,
                                    }}
                                    className="flex gap-3 text-sm text-muted-foreground"
                                  >
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                                    <span>{item}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
