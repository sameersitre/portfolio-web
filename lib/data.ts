export const siteConfig = {
  name: "Sameer Sitre",
  title: "Software Engineer",
  description:
    "Senior Frontend Engineer with 7+ years of experience building secure, scalable web and mobile applications.",
  url: "https://sameersitre.dev",
  email: "sameersitre@gmail.com",
  phone: "+91 7030552747",
  location: "Amravati, Maharashtra, India",
  links: {
    github: "https://github.com/sameersitre",
    linkedin: "https://www.linkedin.com/in/sameersitre",
  },
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

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
];

export const skillCategories = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    title: "Frameworks",
    skills: ["React", "Next.js", "React Native", "Redux Toolkit", "React Query", "Zustand"],
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
    skills: ["Stripe", "Google Maps", "Firebase", "LiveKit", "GraphQL", "REST", "OpenAPI"],
  },
  {
    title: "AI",
    skills: ["Claude Code", "Claude Agents", "Claude Skills", "Prompt Engineering"],
  },
  {
    title: "DevOps",
    skills: ["CI/CD", "TeamCity", "Git", "GitHub Actions"],
  },
];

export const projects = [
  {
    title: "Bingefeast",
    description:
      "PWA for discovering movies/TV shows across streaming platforms with filters, trailers, and cast info.",
    tech: ["React", "Redux", "Material-UI", "Framer Motion", "Node.js", "Express", "MongoDB", "AWS EC2"],
    liveUrl: "https://sameersitre.dev",
    githubUrl: "https://github.com/sameersitre",
    category: "Web",
  },
  {
    title: "Bingee",
    description: "React Native mobile version of Bingefeast with native animations and smooth UX.",
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
];
