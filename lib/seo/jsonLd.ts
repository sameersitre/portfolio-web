// Structured data (schema.org) for the homepage.
// Rendered as a single <script type="application/ld+json"> from app/layout.tsx.

import { siteConfig } from "@/lib/site-config";

const PROFILE_ID = `${siteConfig.url}/#profilepage`;
const PERSON_ID = `${siteConfig.url}/#person`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

export const homepageJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": PROFILE_ID,
    name: "Sameer Sitre — Software Engineer",
    description:
      "Senior Frontend Engineer with 7+ years of experience building secure, scalable web and mobile applications.",
    url: siteConfig.url,
    mainEntity: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: siteConfig.name,
      url: siteConfig.url,
      jobTitle: "Senior Frontend Engineer",
      email: `mailto:${siteConfig.email}`,
      worksFor: {
        "@type": "Organization",
        name: "The Real Brokerage",
      },
      sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
      knowsAbout: [
        "React",
        "Next.js",
        "React Native",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Frontend Development",
        "Mobile Development",
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: `Portfolio of ${siteConfig.name}, Senior Frontend Engineer`,
    publisher: { "@id": PERSON_ID },
  },
];
