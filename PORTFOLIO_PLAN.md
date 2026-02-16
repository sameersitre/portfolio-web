# Portfolio Website Plan — Sameer Sitre

## Overview

A modern, dark-themed, single-page portfolio website for **Sameer Sitre** — Senior Frontend Engineer with 7+ years of experience. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Inspired by top developer portfolios like Brittany Chiang, Lee Robinson, and Dennis Snellenberg.

**Domain:** sameersitre.dev
**Deployment:** Vercel

---

## Design Direction

| Aspect           | Decision                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| **Theme**        | Dark-first with light mode toggle                                                               |
| **Primary BG**   | Deep navy (#0a0a1a) or charcoal (#0f172a)                                                       |
| **Accent Color** | Electric amber/orange (#f59e0b) — matching CV branding                                          |
| **Typography**   | Geist Sans (already set up) + Geist Mono for code                                               |
| **Layout**       | Single-page scrolling with fixed side/top navigation                                            |
| **Animations**   | Subtle scroll-triggered reveals, cursor glow, hover micro-interactions                          |
| **Inspiration**  | brittanychiang.com (layout/nav), leerob.com (minimalism), dennissnellenberg.com (smooth scroll) |

---

## Site Sections

1. **Hero** — Name, title, one-liner, CTA buttons (Contact / Resume)
2. **About** — Brief intro, photo, what I do, what drives me
3. **Experience** — Timeline of work history (REAL, Froogal.ai, Schrocken)
4. **Skills / Tech Stack** — Grouped tech icons with labels
5. **Projects** — Featured project cards with live links, GitHub, tech tags
6. **GitHub** — Contribution graph, stats, pinned repos, open source activity
7. **Contact** — Contact form + social links (GitHub, LinkedIn, Email)
8. **Footer** — Built with tech stack, copyright

---

## Phase 1: Foundation & Layout (Core Structure)

### Goals

Set up the project foundation, global styles, reusable layout components, and navigation.

### Tasks

- [ ] **Clean up boilerplate** — Remove default Next.js template content from `page.tsx` and `globals.css`
- [ ] **Install dependencies**
  - `framer-motion` — Animations
  - `lucide-react` — Icon library
  - `@next/third-parties` — Analytics (optional)
  - `lenis` — Smooth scrolling
- [ ] **Set up global theme**
  - Define CSS variables for colors, spacing, typography in `globals.css`
  - Dark mode as default, light mode via class toggle
  - Custom Tailwind theme extensions (colors, fonts, animations)
- [ ] **Create layout components**
  - `components/layout/Header.tsx` — Fixed top navigation with logo, nav links, theme toggle, resume button
  - `components/layout/Footer.tsx` — Social links, "Built with" stack, copyright
  - `components/layout/Section.tsx` — Reusable section wrapper with consistent padding/max-width
  - `components/layout/SmoothScroll.tsx` — Lenis smooth scroll provider
- [ ] **Set up navigation**
  - Scroll-based active section highlighting
  - Smooth scroll to section on nav click
  - Mobile hamburger menu with animated drawer
- [ ] **Add dark/light mode toggle**
  - Use `next-themes` or custom context for theme switching
  - Persist preference in localStorage
- [ ] **Responsive breakpoints** — Ensure mobile-first design across all layouts

### Deliverable

A fully navigable shell with header, footer, smooth scrolling, and theme toggle — no content yet.

---

## Phase 2: Hero & About Sections

### Goals

Create the first impression — hero section with animated intro, and an about section with personality.

### Tasks

- [ ] **Hero Section** (`components/sections/Hero.tsx`)
  - Large heading: "Sameer Sitre" with text reveal animation
  - Subtitle: "Senior Frontend Engineer"
  - One-liner: "Building secure, scalable web & mobile applications for global markets"
  - CTA buttons: "Get in Touch" (scroll to contact) + "Download Resume" (PDF download)
  - Subtle background effect (gradient mesh, particles, or grid pattern)
  - Animated entrance (staggered fade-in using Framer Motion)
- [ ] **About Section** (`components/sections/About.tsx`)
  - Professional photo (add to `public/images/`)
  - Brief narrative paragraph — who you are, what you do, what excites you
  - Key highlights in a bento-grid or card layout:
    - "7+ Years Experience"
    - "3 Companies"
    - "Web & Mobile"
    - "AI-Driven Development"
  - Scroll-triggered fade-in animations

### Deliverable

A compelling hero with animated text and a personal about section that tells your story.

---

## Phase 3: Experience Section

### Goals

Showcase professional journey with an interactive timeline.

### Tasks

- [ ] **Experience Section** (`components/sections/Experience.tsx`)
  - Interactive vertical timeline or tabbed layout
  - Three entries:
    1. **REAL (The Real Brokerage)** — Apr 2022 - Present
       - Web Platform (React + TypeScript): Design system migration, component architecture, transaction workflows, E2E testing, security hardening, API integration
       - Mobile App (React Native): Transaction wizard, real-time chat, Datadog migration, Canada expansion
       - Release Management: 20+ production releases, cross-team coordination
       - Architecture & AI (Next.js): UI library migration, property details, auth/OTP, favorites system
    2. **Froogal.ai** — Jan 2021 - Apr 2022
       - biryanis.com food ordering platform (web + mobile)
       - Gifting SDK npm package
       - Cross-platform POS system
    3. **Schrocken Inc.** — Nov 2018 - Jan 2021
       - Mosymphony B2B pharma supply chain app
       - Blockchain visualization platform
       - Dynamic UI framework R&D
  - Hover/click to expand role details
  - Company logos (if available) or styled text badges
  - Scroll-triggered staggered reveal animation

### Deliverable

A professional experience timeline that highlights impact and growth across roles.

---

## Phase 4: Skills / Tech Stack Section

### Goals

Visually showcase technical proficiency across categories.

### Tasks

- [ ] **Skills Section** (`components/sections/Skills.tsx`)
  - Grouped by category with icons:
    - **Languages:** TypeScript, JavaScript ES6+, HTML5, CSS3
    - **Frameworks:** React, Next.js, React Native, Redux Toolkit, React Query, Zustand
    - **UI & Styling:** Tailwind CSS, Mantine
    - **Testing:** Playwright, Jest, Vitest, Cypress, Storybook
    - **Monitoring:** Datadog RUM, Bugsnag
    - **Integrations:** Stripe, Google Maps, Firebase, LiveKit, GraphQL, REST, OpenAPI
    - **AI:** Claude Code, Agents, Claude Skills, Prompt Engineering
    - **DevOps:** CI/CD, TeamCity, Git, GitHub Actions
  - Use tech logos/icons (from `devicons` or SVGs in `public/icons/`)
  - Subtle hover animations on each tech icon
  - No skill bars/percentages — just clean icon + label grid
  - Optional: animated entrance as cards/icons stagger in on scroll

### Deliverable

A clean, visual tech stack display grouped by category.

---

## Phase 5: Projects Section

### Goals

Showcase best work with rich project cards including live demos and source code.

### Tasks

- [ ] **Projects Section** (`components/sections/Projects.tsx`)
  - **Featured Projects** (large cards with screenshots):
    1. **Bingefeast** — PWA for discovering movies/TV shows
       - Tech: React, Redux, Material-UI, Framer Motion, Node.js, Express, MongoDB, AWS EC2
       - Links: Live (sameersitre.dev), GitHub
       - Screenshot/mockup
    2. **Bingee** — React Native mobile app (mobile version of Bingefeast)
       - Tech: React Native, Redux, React Native Paper, Lottie
       - Links: Google Play, GitHub
    3. **biryanis.com** — Global food ordering platform
       - Tech: React, React Native, Web + Mobile
       - Links: iOS, Android, Web
    4. **Gifting SDK** — Reusable npm package for loyalty programs
       - Tech: React, npm
       - Links: npm package, aptronixindia.com
    5. **Mosymphony** — B2B pharmaceutical supply chain mobile app
       - Tech: React Native
       - Links: Google Play
  - Project card component with:
    - Screenshot/mockup image
    - Title + description
    - Tech tags (chips/badges)
    - External link + GitHub link icons
    - Hover effect (subtle lift + overlay)
  - Filter by category (optional): Web / Mobile / Library
  - Scroll-triggered staggered entrance

### Deliverable

A polished project showcase with rich cards, tech tags, and live/source links.

---

## Phase 6: GitHub Contributions Section

### Goals

Showcase open source activity, contribution consistency, and coding presence using live GitHub data.

### Tasks

- [ ] **GitHub Section** (`components/sections/GitHub.tsx`)
  - **Contribution Graph / Heatmap**
    - Fetch contribution data via GitHub GraphQL API
    - Render an interactive heatmap similar to GitHub's profile grid
    - Color-coded cells with accent color (amber shades)
    - Tooltip on hover showing date + contribution count
  - **GitHub Stats Cards**
    - Total contributions (current year + all time)
    - Public repositories count
    - Stars received across repos
    - Current streak / longest streak
    - Top languages (pie chart or bar — TypeScript, JavaScript, etc.)
  - **Pinned / Featured Repositories**
    - Fetch pinned repos from GitHub API
    - Display as cards with: repo name, description, language, stars, forks
    - Link to actual GitHub repo
    - Hover effect matching project cards style
  - **Open Source Activity** (optional)
    - Recent public commits or PRs
    - "View full profile on GitHub" CTA link
- [ ] **Data Fetching Strategy**
  - Use GitHub GraphQL API (`api.github.com/graphql`) with a personal access token
  - Fetch at build time via Next.js `fetch` with ISR (revalidate every 24 hours) to keep data fresh without runtime API calls
  - Store GitHub token as environment variable (never expose client-side)
  - Fallback static data in case API is unavailable
- [ ] **Component Design**
  - Match dark theme — heatmap cells with amber/orange gradient on dark background
  - Responsive layout — heatmap scrollable on mobile, stats stack vertically
  - Scroll-triggered entrance animation

### Deliverable

A live GitHub activity section showing contribution graph, repo stats, and pinned repositories — all fetched from the GitHub API.

---

## Phase 7: Contact Section & Form

### Goals

Make it easy for recruiters and collaborators to reach out.

### Tasks

- [ ] **Contact Section** (`components/sections/Contact.tsx`)
  - Heading: "Get In Touch"
  - Brief message: "I'm currently open to new opportunities..."
  - Contact form with fields:
    - Name, Email, Message
    - Submit button with loading state
  - Form handling via Next.js Server Actions or API route + email service (Resend, SendGrid, or Formspree)
  - Social links row:
    - GitHub (github.com/sameersitre)
    - LinkedIn (linkedin.com/in/sameersitre)
    - Email (sameersitre@gmail.com)
    - Phone (optional)
  - Validation with visual feedback
  - Success/error toast notifications

### Deliverable

A functional contact section with form submission and social links.

---

## Phase 8: Polish, Animations & Performance

### Goals

Elevate the site with refined animations, micro-interactions, and performance optimization.

### Tasks

- [ ] **Animations & Micro-interactions**
  - Cursor glow/spotlight effect on hero (inspired by brittanychiang.com)
  - Magnetic button hover effects
  - Text reveal animations on section headings
  - Staggered list animations for experience and project items
  - Smooth page scroll progress indicator (optional)
  - Nav link active state animation
- [ ] **Performance Optimization**
  - Image optimization with `next/image` (WebP, lazy loading, blur placeholders)
  - Font optimization (already using `next/font`)
  - Code splitting (dynamic imports where needed)
  - Lighthouse audit — target 95+ on all metrics
  - Add `loading.tsx` for any route transitions
- [ ] **SEO & Meta**
  - Open Graph tags (title, description, image for social sharing)
  - Twitter Card meta tags
  - Structured data (JSON-LD for Person schema)
  - Sitemap generation (`next-sitemap`)
  - `robots.txt`
  - Canonical URLs
- [ ] **Accessibility**
  - Keyboard navigation for all interactive elements
  - ARIA labels on icons and buttons
  - Focus indicators
  - Color contrast verification (WCAG AA minimum)
  - Screen reader testing

### Deliverable

A polished, performant, accessible, and SEO-optimized portfolio.

---

## Phase 9: Deployment & Launch

### Goals

Deploy to production and ensure everything works flawlessly.

### Tasks

- [ ] **Vercel Deployment**
  - Connect GitHub repo to Vercel
  - Configure custom domain: sameersitre.dev
  - Set up SSL (automatic with Vercel)
  - Environment variables (if any, e.g., email service API keys)
- [ ] **Analytics**
  - Vercel Analytics or Google Analytics 4
  - Track page views, section engagement, resume downloads
- [ ] **Final QA**
  - Cross-browser testing (Chrome, Firefox, Safari, Edge)
  - Mobile device testing (iOS Safari, Android Chrome)
  - Form submission end-to-end test
  - Broken link check
  - Performance audit (Lighthouse, PageSpeed Insights)
- [ ] **Resume PDF**
  - Host `Sameer Sitre CV_2026.pdf` in `public/` for download
  - Ensure it opens correctly / downloads on click
- [ ] **Favicon & OG Image**
  - Custom favicon (initials "SS" or logo)
  - Open Graph preview image for social sharing

### Deliverable

A live, production-ready portfolio at sameersitre.dev.

---

## Project File Structure (Planned)

```
portfolio-web/
├── app/
│   ├── layout.tsx                 # Root layout (fonts, theme, metadata)
│   ├── page.tsx                   # Home page (assembles all sections)
│   ├── globals.css                # Global styles, CSS variables, Tailwind
│   └── favicon.ico                # Custom favicon
├── components/
│   ├── layout/
│   │   ├── Header.tsx             # Fixed navigation
│   │   ├── Footer.tsx             # Footer with social links
│   │   ├── Section.tsx            # Reusable section wrapper
│   │   └── SmoothScroll.tsx       # Lenis smooth scroll provider
│   ├── sections/
│   │   ├── Hero.tsx               # Hero / landing
│   │   ├── About.tsx              # About me
│   │   ├── Experience.tsx         # Work experience timeline
│   │   ├── Skills.tsx             # Tech stack grid
│   │   ├── Projects.tsx           # Project showcase
│   │   ├── GitHub.tsx             # GitHub contributions & stats
│   │   └── Contact.tsx            # Contact form + social links
│   └── ui/
│       ├── Button.tsx             # Reusable button
│       ├── Card.tsx               # Project card
│       ├── ThemeToggle.tsx        # Dark/light mode toggle
│       ├── TechIcon.tsx           # Tech stack icon with label
│       ├── SectionHeading.tsx     # Animated section heading
│       └── MobileMenu.tsx         # Mobile navigation drawer
├── lib/
│   ├── data.ts                    # Portfolio content data (experience, projects, skills)
│   ├── github.ts                  # GitHub API fetching (contributions, repos, stats)
│   └── utils.ts                   # Utility functions (cn helper, etc.)
├── public/
│   ├── images/                    # Profile photo, project screenshots
│   ├── icons/                     # Tech stack SVG icons
│   ├── Sameer_Sitre_CV_2026.pdf   # Downloadable resume
│   └── og-image.png               # Open Graph social preview
├── PORTFOLIO_PLAN.md              # This file
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## Dependencies to Install

| Package                        | Purpose                                               | Phase |
| ------------------------------ | ----------------------------------------------------- | ----- |
| `framer-motion`                | Scroll animations, entrance effects, page transitions | 1     |
| `lucide-react`                 | Icon library (lightweight, tree-shakable)             | 1     |
| `lenis`                        | Smooth scrolling                                      | 1     |
| `next-themes`                  | Dark/light mode management                            | 1     |
| `clsx` + `tailwind-merge`      | Conditional class utilities                           | 1     |
| `next-sitemap`                 | Sitemap & robots.txt generation                       | 8     |
| `resend` or `@formspree/react` | Contact form email delivery                           | 7     |

---

## Content Needed from Sameer

- [ ] Professional headshot photo (high quality, square crop preferred)
- [ ] Project screenshots/mockups (Bingefeast, Bingee, biryanis.com, Mosymphony)
- [ ] Short "About Me" paragraph (personal tone — what drives you, what you enjoy building)
- [ ] Preferred accent color (current CV uses orange/amber — keep it?)
- [ ] Any additional projects to showcase beyond what's on the CV
- [ ] Preferred contact form email service or just mailto link
- [ ] GitHub repo links for each project
- [ ] GitHub personal access token (for contributions API — stored as env variable)
- [ ] Any testimonials or recommendations to include

---

## Summary

| Phase | Focus                | Key Outcome                                   |
| ----- | -------------------- | --------------------------------------------- |
| **1** | Foundation & Layout  | Navigable shell with theme toggle             |
| **2** | Hero & About         | Compelling first impression                   |
| **3** | Experience           | Professional journey timeline                 |
| **4** | Skills               | Visual tech stack display                     |
| **5** | Projects             | Rich project showcase                         |
| **6** | GitHub Contributions | Live contribution graph, stats & pinned repos |
| **7** | Contact              | Functional contact form                       |
| **8** | Polish & Performance | Animations, SEO, accessibility                |
| **9** | Deployment           | Live at sameersitre.dev                       |
