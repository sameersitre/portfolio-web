// Server-side portfolio data fetcher. The backend is the ONLY source of content —
// there is deliberately no static fallback, so a misconfigured or failing backend
// surfaces as an error instead of silently serving stale bundled copy.
//
// `lib/content/*` still exists, but purely as the SEED SOURCE for
// `scripts/seed-portfolio.ts` (`npm run seed:portfolio`) — it is not imported at
// runtime, which is what keeps "API-only" true rather than merely intended.

// Read lazily instead of at module scope. The value only exists at runtime —
// `next build` runs without it, so a module-scope const would capture `undefined`
// and there'd be no way to tell "unset" from "set after the module loaded".
// Trailing slashes are trimmed so both `http://backend:8000` and
// `http://backend:8000/` yield a single-slash request path.
function getBackendUrl(): string | undefined {
  return (
    process.env.BACKEND_INTERNAL_URL?.trim().replace(/\/+$/, "") || undefined
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

// Declared explicitly rather than derived from `lib/content/*` via `typeof`: deriving
// would re-introduce a runtime import of the content just to get its type, and it would
// let a one-off field in the seed data silently widen the wire contract. The content
// files `satisfies` these instead, so the arrow points seed-data → contract, not back.
// Optionality mirrors the guards below — those four fields are not required to render.
export interface ExperienceHighlight {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: ExperienceHighlight[];
  location?: string;
  type?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface PortfolioData {
  experiences: Experience[];
  skillCategories: SkillCategory[];
  projects: Project[];
  aboutParagraphs: string[];
  stats: Stat[];
}

// ─── Runtime validation ──────────────────────────────────────────────────────
// Hand-rolled rather than pulling in zod for a single endpoint. Each entry's
// inner shape is intentionally permissive — the section components only read
// the fields they need.

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

function isExperience(v: unknown): v is Experience {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.company === "string" &&
    typeof o.role === "string" &&
    typeof o.period === "string" &&
    Array.isArray(o.highlights) &&
    o.highlights.every((h) => {
      if (!h || typeof h !== "object") return false;
      const hi = h as Record<string, unknown>;
      return typeof hi.category === "string" && isStringArray(hi.items);
    })
  );
}

function isSkillCategory(v: unknown): v is SkillCategory {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return typeof o.title === "string" && isStringArray(o.skills);
}

function isProject(v: unknown): v is Project {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.title === "string" &&
    typeof o.description === "string" &&
    isStringArray(o.tech) &&
    typeof o.category === "string"
  );
}

function isStat(v: unknown): v is Stat {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return typeof o.value === "string" && typeof o.label === "string";
}

function isPortfolioData(v: unknown): v is PortfolioData {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    Array.isArray(o.experiences) &&
    o.experiences.every(isExperience) &&
    Array.isArray(o.skillCategories) &&
    o.skillCategories.every(isSkillCategory) &&
    Array.isArray(o.projects) &&
    o.projects.every(isProject) &&
    isStringArray(o.aboutParagraphs) &&
    Array.isArray(o.stats) &&
    o.stats.every(isStat)
  );
}

// ─── Fetch from backend ───────────────────────────────────────────────────────

async function fetchPortfolioFromAPI(baseUrl: string): Promise<PortfolioData> {
  const res = await fetch(`${baseUrl}/api/v2/portfolio/content`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 300 }, // ISR: refresh every 5 minutes
  });

  if (!res.ok) {
    throw new Error(`Portfolio API error: ${res.status}`);
  }

  const json: unknown = await res.json();
  if (!isPortfolioData(json)) {
    throw new Error("Portfolio API returned an unexpected shape");
  }
  return json;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * The backend is the only source of portfolio content. Every failure path THROWS
 * rather than degrading, which is the whole point of removing the static fallback:
 * a silent degrade is indistinguishable from healthy, and that is exactly how the
 * site shipped fabricated-looking content for weeks without anyone noticing.
 *
 * Throwing is safe under the route's ISR (`export const revalidate = 300` in
 * app/page.tsx): a failed REVALIDATION keeps serving the last good render, so a
 * transient backend blip is invisible to visitors. Only a cold render with no
 * cached page surfaces the error — which is the case you genuinely want to see.
 *
 * An EMPTY-but-valid response is also an error: the DB is only empty before it has
 * ever been seeded (`npm run seed:portfolio`), and rendering a portfolio with no
 * experience, skills or projects is worse than rendering nothing.
 */
export async function fetchPortfolioData(): Promise<PortfolioData> {
  // BACKEND_INTERNAL_URL is injected by the compose deploy that owns this service
  // (trovie/infra/docker-compose.prod.yml, the `portfolio` service) and by .env.local
  // for local dev. Unset now means MISCONFIGURED, not "standalone deploy".
  const backendUrl = getBackendUrl();
  if (!backendUrl) {
    throw new Error(
      "BACKEND_INTERNAL_URL is not set — portfolio content has no source. " +
        "Set it on the `portfolio` service (see trovie/infra/docker-compose.prod.yml).",
    );
  }

  const data = await fetchPortfolioFromAPI(backendUrl);

  // ANY empty type is a failed seed, not just an all-empty response: a partial seed
  // renders a portfolio silently missing a whole section, which reads as healthy.
  const empty = (
    [
      ["experiences", data.experiences],
      ["skillCategories", data.skillCategories],
      ["projects", data.projects],
      ["aboutParagraphs", data.aboutParagraphs],
      ["stats", data.stats],
    ] as const
  )
    .filter(([, v]) => !v.length)
    .map(([k]) => k);

  if (empty.length) {
    throw new Error(
      `Portfolio API returned no content for: ${empty.join(", ")} — the database ` +
        "has not been fully seeded. Run `npm run seed:portfolio` against the backend.",
    );
  }

  return data;
}
