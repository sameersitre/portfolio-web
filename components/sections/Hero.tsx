"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden px-6"
    >
      {/* Background dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Cursor spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 dark:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.1), transparent 90%)`,
        }}
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-6xl"
      >
        <motion.p
          variants={item}
          className="mb-4 font-mono text-sm text-accent"
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          variants={item}
          className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
        >
          Sameer Sitre<span className="text-accent">.</span>
        </motion.h1>

        <motion.h2
          variants={item}
          className="mt-2 text-3xl font-bold tracking-tight text-muted-foreground sm:text-5xl md:text-6xl"
        >
          I build things for the web.
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-lg text-muted-foreground"
        >
          Senior Frontend Engineer with 7+ years of experience delivering
          secure, scalable web and mobile applications.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex gap-4">
          <a
            href="#contact"
            className="rounded-full border border-accent bg-accent/10 px-6 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
          >
            Get in Touch
          </a>
          <a
            href="#projects"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            See My Work
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <a
            href="#about"
            className="text-muted-foreground/40 transition-colors hover:text-accent"
            aria-label="Scroll to about section"
          >
            <ArrowDown size={20} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
