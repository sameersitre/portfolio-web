// Work history shown in the Experience section.
// SEED SOURCE ONLY — not imported at runtime. `npm run seed:portfolio` POSTs this to
// the backend, which is the site's single source of content (see lib/portfolio.ts).

import type { Experience } from "@/lib/portfolio";

export const experiences = [
  {
    company: "REAL (The Real Brokerage)",
    location: "NY, USA",
    role: "Frontend Engineer",
    period: "April 2022 — Present",
    type: "Remote",
    highlights: [
      {
        category: "Web Platform — React + TypeScript",
        items: [
          "Led migration to the Zen design system with full test coverage",
          "Built reusable, type-safe form components adopted platform-wide",
          "Developed end-to-end transaction creation flows with commission steps, title integration, and multi-step wizards",
          "Contributed in building E2E testing foundation with Playwright, centralised mocks, and snapshot regression tests",
          "Resolved high-severity vulnerabilities, achieving zero critical alerts across the frontend",
          "Built feature flag search, optimised endpoints, and office-level document management tools",
          "Integrated microservices via OpenAPI TypeScript clients including Stripe and Datadog RUM",
        ],
      },
      {
        category: "Mobile App — React Native + TypeScript",
        items: [
          "Built multi-step transaction creation with paginated search, address lookup, and commission selection",
          "Designed chat system with bubbles, read receipts, avatar stacks",
          "Led Bugsnag-to-Datadog migration across iOS/Android with navigation tracking and error reporting",
          "Built Canadian transaction support with country-based logic for a single US/Canada codebase",
        ],
      },
      {
        category: "Release Management & Architecture",
        items: [
          "Orchestrated 20+ production releases end-to-end across 5+ engineering teams",
          "Led migration from legacy UI library to Mantine UI with Storybook documentation",
          "Architected full property listing details page with i18n support",
          "Designed multi-step OTP login with phone verification and responsive mobile drawer",
          "Built E2E testing foundation with Playwright, centralized mocks, and snapshot regression tests",
        ],
      },
    ],
  },
  {
    company: "Froogal.ai",
    location: "Hyderabad",
    role: "Software Engineer",
    period: "Jan 2021 — April 2022",
    type: "On-site",
    highlights: [
      {
        category: "Full Stack Development",
        items: [
          "Built global food ordering platform (biryanis.com) supporting multi-channel ordering, table reservations, and loyalty programs across web and mobile",
          "Developed and published reusable npm package for loyalty program gifting functionality, deployed across multiple production applications",
          "Contributed to cross-platform POS system development, collaborating with engineering teams on feature implementation",
        ],
      },
    ],
  },
  {
    company: "Schrocken Inc.",
    location: "Hyderabad",
    role: "Software Engineer",
    period: "Nov 2018 — Jan 2021",
    type: "On-site",
    highlights: [
      {
        category: "Product Development",
        items: [
          "Developed B2B pharmaceutical supply chain mobile app (Mosymphony) enabling real-time production tracking and delivery monitoring",
          "Built enterprise blockchain visualisation platform integrating Hyperledger Fabric data with real-time IoT device feeds via WebSockets",
          "Prototyped dynamic UI framework as R&D initiative, creating backend-controlled UI composition without frontend deployments",
        ],
      },
    ],
  },
] satisfies Experience[];
