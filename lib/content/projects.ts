// Featured projects shown in the Projects section.
// SEED SOURCE ONLY — see lib/content/experiences.ts.

import type { Project } from "@/lib/portfolio";

export const projects = [
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
      "Global food ordering platform supporting multi-channel ordering, table reservations, and comprehensive loyalty program.",
    tech: ["React", "React Native", "Node.js", "Web + Mobile"],
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
      "B2B pharmaceutical supply chain mobile app enabling real-time production tracking and delivery monitoring.",
    tech: ["React Native", "Redux", "WebSockets"],
    liveUrl: "",
    githubUrl: "",
    category: "Mobile",
  },
] satisfies Project[];
