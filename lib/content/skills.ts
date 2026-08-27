// Skill categories shown in the Skills section.
// SEED SOURCE ONLY — see lib/content/experiences.ts.

import type { SkillCategory } from "@/lib/portfolio";

export const skillCategories = [
  {
    title: "Languages",
    skills: [
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Java",
      "Objective-C",
    ],
  },
  {
    title: "Web Frameworks",
    skills: [
      "React",
      "Next.js",
      "Redux Toolkit",
      "TanStack Query",
      "React Router",
      "Zustand",
      "Vite",
    ],
  },
  {
    title: "Mobile",
    skills: [
      "React Native",
      "React Navigation",
      "Reanimated",
      "MMKV",
      "tailwind-rn",
      "patch-package",
      "Fastlane",
    ],
  },
  {
    title: "Forms & Validation",
    skills: ["React Hook Form", "Zod", "Yup"],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "JWT / OAuth 2.0",
      "Auth.js",
      "Rate limiting",
      "Caching strategy",
    ],
  },
  {
    title: "Infrastructure",
    skills: [
      "Docker",
      "docker compose",
      "nginx",
      "Let's Encrypt",
      "GCP",
      "Fastlane",
      "npm workspaces",
      "Monorepo tooling",
    ],
  },
  {
    title: "UI & Styling",
    skills: [
      "Tailwind CSS",
      "Mantine",
      "styled-components",
      "Framer Motion",
      "Storybook",
      "NativeBase",
    ],
  },
  {
    title: "Testing",
    skills: [
      "Vitest",
      "Jest",
      "Playwright",
      "Cypress",
      "React Testing Library",
      "React Native Testing Library",
      "Faker fixtures",
      "Redux state factories",
    ],
  },
  {
    title: "API & Contracts",
    skills: [
      "OpenAPI / Swagger codegen",
      "typescript-axios",
      "REST",
      "GraphQL",
      "WebSockets",
      "Server-Sent Events",
    ],
  },
  {
    title: "Monitoring & Analytics",
    skills: [
      "Datadog RUM",
      "Sentry",
      "Bugsnag",
      "Amplitude",
      "Mixpanel",
      "SonarQube",
    ],
  },
  {
    title: "Integrations",
    skills: [
      "Stripe",
      "RevenueCat",
      "AdMob",
      "Firebase Cloud Messaging",
      "Google Maps & Places",
      "LiveKit",
      "Facebook SDK",
      "Plaid",
    ],
  },
  {
    title: "AI",
    skills: [
      "Claude Code",
      "Claude API",
      "Claude Agents",
      "Claude Skills",
      "MCP",
      "Prompt Engineering",
      "LLM cost control",
      "Grounded generation",
    ],
  },
  {
    title: "DevOps",
    skills: [
      "CI/CD",
      "TeamCity",
      "GitHub Actions",
      "Docker",
      "Git",
      "Husky + commitlint",
    ],
  },
] satisfies SkillCategory[];
