// Shared Framer Motion variants used across section components.
// Factories let each section tune timing without redeclaring the variant shape.

import type { Variants } from "framer-motion";

export const EASE_OUT = "easeOut" as const;

export function staggerContainer(
  staggerChildren = 0.1,
  delayChildren = 0,
): Variants {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren, delayChildren },
    },
  };
}

export function fadeUp(duration = 0.4, y = 20): Variants {
  return {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: EASE_OUT },
    },
  };
}
