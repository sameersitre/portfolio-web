"use client";

// Typed GA4 event surface for the portfolio. Call sites should prefer the
// topical helpers (trackContact, trackProject, …) over raw track() — the
// helpers keep call-site noise low and turn schema changes into a one-file edit.
//
// Pipeline: typed event → window.gtag (transport: beacon) → GA4. No-op when
// ANALYTICS_ENABLED is false (dev, or NEXT_PUBLIC_GA_ID unset).

import { ANALYTICS_ENABLED } from "./config";

export type SectionName =
  | "about"
  | "experience"
  | "skills"
  | "projects"
  | "github"
  | "contact";

export type NavSection = SectionName | "home";
export type NavSurface = "desktop" | "mobile";
export type ContactMethod = "email" | "phone" | "github" | "linkedin";
export type ProjectKind = "source" | "demo";
export type ThemeValue = "light" | "dark";
export type CtaLocation = "hero_primary" | "hero_secondary" | "hero_scroll";
export type OutboundDestination =
  | "source_repo_header"
  | "source_repo_header_mobile";

export type AnalyticsEvent =
  | { name: "section_view"; params: { section: SectionName } }
  | { name: "nav_click"; params: { section: NavSection; surface: NavSurface } }
  | {
      name: "cta_click";
      params: { location: CtaLocation; destination: string };
    }
  | { name: "theme_toggle"; params: { theme: ThemeValue } }
  | { name: "experience_expand"; params: { company: string; role: string } }
  | { name: "project_filter"; params: { filter: string } }
  | {
      name: "project_click";
      params: { project: string; kind: ProjectKind; href: string };
    }
  | { name: "github_year_filter"; params: { year: number } }
  | { name: "github_profile_view"; params: Record<string, never> }
  | { name: "pinned_repo_click"; params: { repo: string; href: string } }
  | {
      name: "contact_click";
      params: { method: ContactMethod; href: string };
    }
  | {
      name: "outbound_click";
      params: { href: string; host: string; destination: OutboundDestination };
    }
  | { name: "resume_view"; params: { surface: NavSurface } };

type Primitive = string | number | boolean | null | undefined;

// transport_type: 'beacon' routes through navigator.sendBeacon, which the
// browser guarantees to deliver across page-unloads — required for events on
// <a> tags that both fire and navigate away.
type GtagFn = (
  command: "event",
  name: string,
  params: Record<string, Primitive> & { transport_type?: "beacon" },
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

export function track(event: AnalyticsEvent): void {
  if (!ANALYTICS_ENABLED) return;
  const gtag = typeof window !== "undefined" ? window.gtag : undefined;
  if (typeof gtag === "function") {
    gtag("event", event.name, {
      ...(event.params as Record<string, Primitive>),
      transport_type: "beacon",
    });
    return;
  }
  // gtag.js still loading — fall back to sendGAEvent which queues into
  // dataLayer. Dynamic import keeps @next/third-parties out of the per-page
  // chunk for visitors who never hit this race window.
  void import("@next/third-parties/google").then(({ sendGAEvent }) => {
    sendGAEvent("event", event.name, event.params as Record<string, Primitive>);
  });
}

// --- Topical helpers (preferred at call sites) ---

export function trackSectionView(section: SectionName): void {
  track({ name: "section_view", params: { section } });
}

export function trackNav(section: NavSection, surface: NavSurface): void {
  track({ name: "nav_click", params: { section, surface } });
}

export function trackCta(location: CtaLocation, destination: string): void {
  track({ name: "cta_click", params: { location, destination } });
}

export function trackThemeToggle(theme: ThemeValue): void {
  track({ name: "theme_toggle", params: { theme } });
}

export function trackExperienceExpand(company: string, role: string): void {
  track({ name: "experience_expand", params: { company, role } });
}

export function trackProjectFilter(filter: string): void {
  track({ name: "project_filter", params: { filter } });
}

export function trackProject(
  project: string,
  kind: ProjectKind,
  href: string,
): void {
  track({ name: "project_click", params: { project, kind, href } });
}

export function trackYearFilter(year: number): void {
  track({ name: "github_year_filter", params: { year } });
}

export function trackGithubProfileView(): void {
  track({ name: "github_profile_view", params: {} });
}

export function trackPinnedRepo(repo: string, href: string): void {
  track({ name: "pinned_repo_click", params: { repo, href } });
}

export function trackContact(method: ContactMethod, href: string): void {
  track({ name: "contact_click", params: { method, href } });
}

export function trackResumeView(surface: NavSurface): void {
  track({ name: "resume_view", params: { surface } });
}

// Extracts host so GA4 groups by domain in Top Events; falls back to the raw
// href if URL parsing fails.
export function trackOutbound(
  href: string,
  destination: OutboundDestination,
): void {
  let host = href;
  try {
    host = new URL(href).host;
  } catch {
    // Non-URL href — keep raw value so the click still records.
  }
  track({ name: "outbound_click", params: { href, host, destination } });
}
