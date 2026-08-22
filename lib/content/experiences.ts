// Work history shown in the Experience section.
// SEED SOURCE ONLY — not imported at runtime. `npm run seed:portfolio` POSTs this to
// the backend, which is the site's single source of content (see lib/portfolio.ts).

import type { Experience } from "@/lib/portfolio";

export const experiences = [
  {
    company: "REAL (The Real Brokerage)",
    location: "NY, USA",
    role: "Senior Software Engineer",
    period: "April 2022 — Present",
    type: "Remote",
    highlights: [
      {
        category: "Web Platform — React + TypeScript",
        items: [
          "Built the compliance layer that lets Legal freeze operations across transactions, listings and agents — two-tier enforcement where the UI restricts optimistically and a Redux interceptor turns the backend's 403 into a support escalation rather than a dead end",
          "Rebuilt the agent's financial and tax surface as sidebar-modal forms covering 1099/T4A generation, cap credits and commission advances, producing three generically-typed React Hook Form primitives now imported across 56 files",
          "Shipped the agent-facing surface of a lending product, with one typed schedule generator driving both the pre-signature preview and the post-funding detail view so signed terms and audited terms cannot drift",
          "Migrated an untyped agent-search contract across every agent picker in the product — a 17-positional-argument function became a typed params object, still in production 19 months later across 31 call sites",
          "Led migration from a legacy UI library to Mantine with Storybook documentation, and drove the Zen design-system rollout with full test coverage",
          "Resolved high-severity vulnerabilities to reach zero critical alerts across the frontend",
          "Integrated microservices through generated OpenAPI TypeScript clients, deriving frontend types from the client signatures so a backend contract change is a red build rather than a blank dropdown",
        ],
      },
      {
        category: "Mobile App — React Native + TypeScript",
        items: [
          "Built the transaction and listing wizards that replaced a third-party vendor: a 16-step transaction flow and a 5-step listing flow on one generic step machine, with declarative predicates so US, Canadian and dual-agency deals render different paths from a single graph",
          "Added per-step server autosave to those wizards so nothing is lost when the app dies mid-showing",
          "Moved escrow refund requests off email and off desktop — one form serving create, edit and read-only, with payment rails branching to ACH/EFT, Wire or Cheque and a seven-state approval pipeline modelled as exhaustive status×role maps",
          "Shipped in-app announcements with server-recorded acknowledgement and a dismissal budget, plus a native waveform audio scrubber that required forking an abandoned React Native module through patch-package — live three years on",
          "Ran a whole-app redesign as a zero-downtime rollout, dual-rendering legacy and new chrome behind a flag down to two entire bottom-tab navigators; reached 100% of agents on both platforms without a rollback",
          "Led the Bugsnag-to-Datadog migration across JavaScript, iOS and Android — including AppDelegate, Podfile, Info.plist, Gradle and Fastlane — leaving no trace of the old vendor",
          "Built Canadian transaction support with country-based logic so one codebase serves US and Canadian jurisdictions",
        ],
      },
      {
        category: "Engineering Practice",
        items: [
          "Wrote roughly as much test code as product code — 27,000+ lines and 148 spec files on web alone, asserting the payload that reached the API client rather than the render",
          "Treated feature flags as cradle-to-grave: every flag appears twice in the history, once when added and once in the net-negative commit that retires it and collapses its dead branches",
          "Favoured exhaustive maps keyed by enum over if-chains, so adding an enum member is a compile error instead of a silent fallthrough",
          "Built deterministic E2E suites across two eras — a typed registry of network-wait configurations in Cypress, then API-seeded state and response-driven waits in Playwright; never sleep, never guess",
          "Orchestrated 20+ production releases end-to-end across 5+ engineering teams",
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
        category: "White-label Ordering & Loyalty Platform",
        items: [
          "Highest-volume contributor to a React Native food-ordering and loyalty app shipped as nine separately-branded consumer apps from one codebase, authoring 197 of 351 commits and 18 release builds",
          "Rebuilt the menu screen — the longest-dwell surface in the app — as a 14-file module with sticky category tabs, search, promotional carousel, veg filter and add-on modals, then deleted the three diverged legacy variants it replaced",
          "Took the cart apart: a 1,523-line component plus four dead siblings became a 356-line orchestrator over seven named children, on a server-authoritative model where every mutation re-reads canonical totals instead of patching locally",
          "Deleted three thousand more lines than added — five decomposition passes and five deletion passes removing ~9,000 lines of duplicated screens and superseded Redux slices",
          "Replaced a per-keystroke regex scan behind a fake timeout with a real debounce over a precomputed lowercase index built at normalisation time",
          "Fixed category-tab scrolling by replacing a hardcoded pixel offset with a layout-time measurement, correct on every screen size rather than only the device it was written on",
        ],
      },
      {
        category: "Release, Native & Reliability",
        items: [
          "Upgraded React Native 0.65.1 → 0.66.4 and resolved the Android transitive-SDK failure and Apple Silicon Podfile issues that followed",
          "Integrated Sentry end to end — SDK, Gradle plugin, source-map upload and release/dist tagging — then ran a crash-fix pass driven by what it reported",
          "Migrated Firebase Cloud Messaging from a commented-out v5 namespaced API to the v14 modular API, fixing a device-token Promise that had been silently swallowing failures",
          "Shipped Facebook Login across both platforms, including iOS bridging header and AppDelegate wiring and Android activity and login-protocol declarations",
          "Took over integration: sole merger to the main branch for the final two months of active development",
        ],
      },
      {
        category: "Full Stack",
        items: [
          "Built the global food ordering platform at biryanis.com supporting multi-channel ordering, table reservations and loyalty programs across web and mobile",
          "Developed and published a reusable npm package for loyalty-program gifting, deployed across multiple production applications",
          "Contributed to cross-platform POS system development alongside other engineering teams",
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
