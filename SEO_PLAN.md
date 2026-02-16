# SEO Implementation Plan

## Current State: 7.5/10

Solid foundation with metadata, JSON-LD, robots, sitemap, semantic HTML, and accessibility. Missing social image previews, advanced structured data, analytics, and performance monitoring.

---

## Phase 1 — Metadata & Canonical (Quick Wins)

**Files:** `app/layout.tsx`

- [ ] Add `alternates.canonical` URL to metadata
- [ ] Add `robots` directive with `max-image-preview: large`, `max-snippet: -1`
- [ ] Add explicit OG image reference (1200x630) with dimensions and alt text
- [ ] Add Twitter image reference and `creator` handle
- [ ] Add `creator` field to metadata
- [ ] Add `theme-color` meta tags for dark/light modes

---

## Phase 2 — Dynamic OG Image

**Files:** `app/opengraph-image.tsx`, `app/twitter-image.tsx`

- [ ] Create `opengraph-image.tsx` using `ImageResponse` API (Edge Runtime)
  - Dark background (#0a0a0a), "Sameer Sitre" title, subtitle, tech stack
  - 1200x630 dimensions, PNG format
- [ ] Create `app/twitter-image.tsx` (re-export or duplicate for Twitter cards)
- [ ] Test previews with opengraph.xyz / Facebook Debugger / LinkedIn Inspector

---

## Phase 3 — Enhanced Structured Data (JSON-LD)

**Files:** `app/layout.tsx`

- [ ] Wrap existing `Person` schema inside `ProfilePage` as `mainEntity`
- [ ] Add `@id` references for cross-linking schemas
- [ ] Add `WebSite` schema with publisher reference
- [ ] Add `image` and `email` fields to Person schema
- [ ] Validate with Google Rich Results Test

---

## Phase 4 — Security Headers & Next.js Config

**Files:** `next.config.ts`

- [ ] Add `X-Content-Type-Options: nosniff`
- [ ] Add `X-Frame-Options: DENY`
- [ ] Add `X-XSS-Protection: 1; mode=block`
- [ ] Add `Referrer-Policy: strict-origin-when-cross-origin`

---

## Phase 5 — Robots.txt for AI Crawlers (GEO)

**Files:** `app/robots.ts`

- [ ] Explicitly allow GPTBot, ChatGPT-User, anthropic-ai, ClaudeBot
- [ ] Keep existing allow-all rule for traditional crawlers

---

## Phase 6 — Analytics & Monitoring

**Files:** `app/layout.tsx`, `package.json`

- [ ] Install `@vercel/analytics` and `@vercel/speed-insights`
- [ ] Add `<Analytics />` and `<SpeedInsights />` to layout
- [ ] (Optional) Install `@next/third-parties` for Google Analytics GA4
- [ ] (Optional) Add `useReportWebVitals` for Core Web Vitals logging

---

## Phase 7 — PWA Manifest

**Files:** `app/manifest.ts`

- [ ] Create manifest with app name, description, icons, theme color, background color
- [ ] Reference the existing `icon.svg` and `favicon.ico`

---

## Phase 8 — Font & Image Optimization

**Files:** `app/layout.tsx`, component files

- [ ] Add `display: "swap"` to Geist font configs
- [ ] Use `next/image` with `priority` for above-the-fold images
- [ ] Add `sizes` attribute for responsive images
- [ ] Ensure all `<img>` tags have descriptive `alt` text

---

## Verification Checklist

After all phases:

- [ ] `npm run build` — zero errors
- [ ] Test OG image at opengraph.xyz
- [ ] Validate JSON-LD at https://search.google.com/test/rich-results
- [ ] Check Lighthouse SEO score (target: 100)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify social previews on LinkedIn, Twitter/X, Discord
