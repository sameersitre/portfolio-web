// Featured projects shown in the Projects section.
// SEED SOURCE ONLY — see lib/content/experiences.ts.

import type { Project } from "@/lib/portfolio";

export const projects = [
  {
    title: "Create Transaction & Listing",
    description:
      "The wizards that let a brokerage retire its third-party transaction vendor. A 16-step transaction flow and a 5-step listing flow on one generic step machine, with declarative predicates so US, Canadian and dual-agency deals render different paths from a single graph — plus per-step server autosave. 101 commits over 7 months across 102 files.",
    tech: [
      "React Native",
      "TypeScript",
      "Redux Toolkit",
      "React Hook Form",
      "OpenAPI",
    ],
    liveUrl: "",
    githubUrl: "",
    category: "Mobile",
  },
  {
    title: "Flags & Legal Holds",
    description:
      "A compliance layer letting Legal freeze operations across transactions, listings and agents. Two-tier enforcement: the UI restricts optimistically while a Redux interceptor turns the backend's 403 into a support escalation rather than a dead end. Batched flag lookups cut admin-table requests from one per row to one per page. 108 commits in 5 weeks, ~9,700 hand-written lines against 4,900 lines of tests.",
    tech: ["React", "TypeScript", "Redux Toolkit", "Mantine", "Vitest"],
    liveUrl: "",
    githubUrl: "",
    category: "Web",
  },
  {
    title: "Zen Forms Platform",
    description:
      "An agent's entire financial and tax surface rebuilt as sidebar-modal forms — the fields driving 1099 and T4A generation, cap credits and commission advances. Produced three generically-typed React Hook Form primitives; the footer component alone is imported by 56 files. 109 commits; one PR spanned 58 files and +10,423 lines.",
    tech: ["React", "TypeScript", "React Hook Form", "Zod", "Storybook"],
    liveUrl: "",
    githubUrl: "",
    category: "Web",
  },
  {
    title: "Release of Trust Funds",
    description:
      "Escrow refund requests moved off email and off desktop. One form serves create, edit and read-only; payment rails branch to ACH/EFT, Wire or Cheque with US and Canadian trust-account validation; and a seven-state approval pipeline is modelled as exhaustive status×role maps so a new backend status becomes a compile error. 59 commits, ~5,900 lines, 742-line test suite.",
    tech: ["React Native", "TypeScript", "Redux Toolkit", "Jest"],
    liveUrl: "",
    githubUrl: "",
    category: "Mobile",
  },
  {
    title: "Agent-Search Migration",
    description:
      "Replacing an untyped search contract underneath every agent picker in the product — twice over, because two design systems coexisted. A 17-positional-argument function that callers invoked with runs of six consecutive undefineds became a typed params object. 64 files over 4 months; still in production 19 months later across 31 call sites.",
    tech: ["TypeScript", "React", "React Native", "OpenAPI", "Axios"],
    liveUrl: "",
    githubUrl: "",
    category: "Web",
  },
  {
    title: "Announcements + Waveform Audio",
    description:
      "A brokerage with no offices had no way to reach phone-only agents with compliance notices, and no proof they had seen them. This shipped both: a sheet with server-recorded acknowledgement and a dismissal budget, plus a native waveform scrubber that required forking an abandoned React Native module through patch-package. 53 commits in 3 weeks; live three years on.",
    tech: ["React Native", "TypeScript", "Redux Toolkit", "patch-package"],
    liveUrl: "",
    githubUrl: "",
    category: "Mobile",
  },
  {
    title: "RevShare Advance",
    description:
      "The agent-facing surface of a lending product. A single typed schedule generator drives both the pre-signature preview and the post-funding detail sidebar, so the terms an agent signs and the terms they later audit cannot drift. Jurisdiction-aware legal agreements for CA, VT, OK and ND. 93 commits, 13 components, 3 flagged routes.",
    tech: ["React", "TypeScript", "TanStack Query", "Zod"],
    liveUrl: "",
    githubUrl: "",
    category: "Web",
  },
  {
    title: "Zen Design-System Rollout",
    description:
      "A whole-app mobile redesign run as a zero-downtime rollout: legacy and new chrome dual-rendered behind a flag, down to conditionally mounting two entire bottom-tab navigators. Reached 100% of agents on both platforms without a rollback, and the flag was deleted ten weeks later. 155 commits, 172 files, 58 new components.",
    tech: ["React Native", "TypeScript", "React Navigation", "Reanimated"],
    liveUrl: "",
    githubUrl: "",
    category: "Mobile",
  },
  {
    title: "Bingefeast",
    description:
      "PWA for discovering movies/TV shows across streaming platforms with filters, trailers, and cast info.",
    tech: [
      "React",
      "Redux",
      "Material-UI",
      "Framer Motion",
      "Node.js",
      "Express",
      "MongoDB",
      "AWS EC2",
    ],
    liveUrl: "https://streamseek.sameersitre.dev/",
    githubUrl: "https://github.com/sameersitre/streamseek",
    category: "Web",
  },
  {
    title: "Bingee",
    description:
      "React Native mobile version of Bingefeast with native animations and smooth UX.",
    tech: ["React Native", "Redux", "React Native Paper", "Lottie"],
    liveUrl: "",
    githubUrl: "https://github.com/sameersitre",
    category: "Mobile",
  },
  {
    title: "biryanis.com",
    description:
      "Global food ordering platform supporting multi-channel ordering, table reservations, and a loyalty program — shipped as nine separately-branded consumer apps from a single white-label React Native codebase.",
    tech: ["React", "React Native", "Redux", "Node.js", "Sentry", "Firebase"],
    liveUrl: "",
    githubUrl: "",
    category: "Web",
  },
  {
    title: "Gifting SDK",
    description:
      "Reusable npm package for loyalty program gifting functionality, deployed across multiple production applications.",
    tech: ["React", "npm", "TypeScript"],
    liveUrl: "",
    githubUrl: "",
    category: "Library",
  },
  {
    title: "Mosymphony",
    description:
      "B2B pharmaceutical supply chain mobile app enabling real-time production tracking and delivery monitoring, with Hyperledger Fabric data and live IoT feeds over WebSockets.",
    tech: ["React Native", "Redux", "WebSockets", "Hyperledger Fabric"],
    liveUrl: "",
    githubUrl: "",
    category: "Mobile",
  },
] satisfies Project[];
