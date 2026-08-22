// Site identity: name, contact info, canonical URL, primary nav.
// Single source of truth — SEO metadata, JSON-LD, the web manifest, the OG
// image, Hero, Header, Footer and the Contact section all derive from this.
// Nothing here should be re-typed as a literal elsewhere.

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
    sourceRepo: "https://github.com/sameersitre/portfolio-web",
    resume:
      "https://drive.google.com/file/d/1wrCdThQQUx355icNMoc45dA-qPRcJ_B0/view",
  },
};

// "<name> — <title>", the composed heading used by <title>, the OG/Twitter
// cards, the web manifest and JSON-LD. Derived rather than repeated so a change
// to `name` above propagates to every surface.
export const siteTitle = `${siteConfig.name} — ${siteConfig.title}`;

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];
