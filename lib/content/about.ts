// About-section copy and stat tiles.
// SEED SOURCE ONLY — see lib/content/experiences.ts.

import type { Stat } from "@/lib/portfolio";

/** Bio paragraphs, rendered in order. Plain text — no markup. */
export const aboutParagraphs = [
  "I'm a senior software engineer who loves building products that people actually use. With 7+ years in the industry, I've shipped production features to thousands of users across global markets.",
  "My work spans the whole product surface — web, mobile, and the native, API and CI layers underneath. Design system architecture and performance optimisation, but equally typed API contracts, end-to-end test automation, release pipelines and security hardening. I've led UI library migrations, built real-time chat systems, and orchestrated 20+ production releases across multiple engineering teams.",
  "Currently at The Real Brokerage, I work across web (React + TypeScript), mobile (React Native) and the services behind them. I'm passionate about AI-driven development workflows and building tools that make developers more productive.",
  "Outside work I build and operate Trovie \u2014 a streaming discovery product with a React Native app on Google Play, a Next.js web client and an Express/Mongo/Redis backend, all shipped and run solo. It is also the API behind this site. Running my own production system is where I learned to pick failure semantics deliberately: the cache fails soft, the spend budget fails closed, the paywall fails open.",
  "When I'm not coding, you'll find me cycling, playing chess, or exploring the latest in AI and open source.",
];

/** Stat tiles under the bio. Kept short — these are glanced at, not read. */
export const stats = [
  { value: "7+", label: "Years Experience" },
  { value: "3", label: "Companies" },
  { value: "20+", label: "Production Releases" },
  { value: "1000s", label: "Users Served" },
] satisfies Stat[];
