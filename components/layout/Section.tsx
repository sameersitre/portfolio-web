"use client";

// Section wrapper used by every page section: standard padding, max-width,
// view-port reveal animation, and one-shot GA section_view event.

import { motion } from "framer-motion";
import { trackSectionView, type SectionName } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: SectionName;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onViewportEnter={() => trackSectionView(id)}
      className={cn("px-6 py-20 md:py-28", className)}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </motion.section>
  );
}
