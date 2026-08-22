// Structured data (schema.org) for the homepage.
//
// Built from the SAME portfolio payload the page renders, so the machine-readable
// description of this person cannot drift from the human-readable one: publish a new
// skill or a new job through the API and the JSON-LD says so on the next revalidation.
// Only stable identity (name, url, email, links, job title) comes from lib/site-config.
//
// Rendered from app/page.tsx rather than the layout — the layout has no portfolio data,
// and schema.org in <body> is read the same as in <head>.

import type { PortfolioData } from "@/lib/portfolio";
import { siteConfig } from "@/lib/site-config";

const PROFILE_ID = `${siteConfig.url}/#profilepage`;
const PERSON_ID = `${siteConfig.url}/#person`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

// Broad competencies that describe the practice rather than any one tool. The concrete
// technologies are appended from the published skills below.
const DISCIPLINES = [
  "Full Stack Development",
  "Mobile Development",
  "Software Architecture",
  "Test Automation",
];

/**
 * Every published skill, de-duplicated, discipline terms first.
 *
 * Flattening the categories rather than naming technologies here is the point: the
 * skills grid and `knowsAbout` are then guaranteed to agree.
 */
function knowsAbout(data: PortfolioData): string[] {
  return [
    ...new Set([
      ...DISCIPLINES,
      ...data.skillCategories.flatMap((c) => c.skills),
    ]),
  ];
}

/**
 * The most recent employer. `experiences` is authored newest-first, so entry 0 is the
 * current role; omit `worksFor` entirely rather than emit an empty Organization when
 * there is no experience published.
 */
function worksFor(data: PortfolioData) {
  const current = data.experiences[0];
  return current
    ? { worksFor: { "@type": "Organization", name: current.company } }
    : {};
}

export function buildHomepageJsonLd(data: PortfolioData) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": PROFILE_ID,
      name: `${siteConfig.name} — ${siteConfig.title}`,
      description: siteConfig.description,
      url: siteConfig.url,
      mainEntity: {
        "@type": "Person",
        "@id": PERSON_ID,
        name: siteConfig.name,
        url: siteConfig.url,
        jobTitle: siteConfig.title,
        email: `mailto:${siteConfig.email}`,
        ...worksFor(data),
        sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
        knowsAbout: knowsAbout(data),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: siteConfig.url,
      name: siteConfig.name,
      description: `Portfolio of ${siteConfig.name}, ${siteConfig.title}`,
      publisher: { "@id": PERSON_ID },
    },
  ];
}
