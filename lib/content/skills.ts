// Skill categories shown in the Skills section.
// SEED SOURCE ONLY — see lib/content/experiences.ts.

import type { SkillCategory } from "@/lib/portfolio";

export const skillCategories = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    title: "Frameworks",
    skills: [
      "React",
      "Next.js",
      "React Native",
      "Redux Toolkit",
      "React Query",
      "Zustand",
    ],
  },
  {
    title: "UI & Styling",
    skills: ["Tailwind CSS", "Mantine"],
  },
  {
    title: "Testing",
    skills: ["Playwright", "Jest", "Vitest", "Cypress", "Storybook"],
  },
  {
    title: "Monitoring",
    skills: ["Datadog RUM", "Bugsnag"],
  },
  {
    title: "Integrations",
    skills: [
      "Stripe",
      "Google Maps",
      "Firebase",
      "LiveKit",
      "GraphQL",
      "REST",
      "OpenAPI",
    ],
  },
  {
    title: "AI",
    skills: [
      "Claude Code",
      "Claude Agents",
      "Claude Skills",
      "Prompt Engineering",
    ],
  },
  {
    title: "DevOps",
    skills: ["CI/CD", "TeamCity", "Git", "GitHub Actions"],
  },
] satisfies SkillCategory[];
