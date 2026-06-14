// Server-side portfolio data fetcher with static fallback.
// Tries the backend's /api/v2/portfolio/content; on failure or empty response,
// returns the bundled static content.

import { experiences } from "@/lib/content/experiences";
import { projects } from "@/lib/content/projects";
import { skillCategories } from "@/lib/content/skills";

const BACKEND_URL = process.env.BACKEND_INTERNAL_URL;

// ─── Types ────────────────────────────────────────────────────────────────────

export type Experience = (typeof experiences)[number];
export type SkillCategory = (typeof skillCategories)[number];
export type Project = (typeof projects)[number];

export interface PortfolioData {
  experiences: Experience[];
  skillCategories: SkillCategory[];
  projects: Project[];
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

function isPortfolioData(v: unknown): v is PortfolioData {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    Array.isArray(o.experiences) &&
    o.experiences.every(isExperience) &&
    Array.isArray(o.skillCategories) &&
    o.skillCategories.every(isSkillCategory) &&
    Array.isArray(o.projects) &&
    o.projects.every(isProject)
  );
}

// ─── Fetch from backend ───────────────────────────────────────────────────────

async function fetchPortfolioFromAPI(): Promise<PortfolioData> {
  const res = await fetch(`${BACKEND_URL}/api/v2/portfolio/content`, {
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

// ─── Fallback to static data.ts ──────────────────────────────────────────────

function getFallbackData(): PortfolioData {
  return { experiences, skillCategories, projects };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function fetchPortfolioData(): Promise<PortfolioData> {
  // No backend configured — use static content. The Docker compose deploy
  // sets BACKEND_INTERNAL_URL; standalone deploys (Vercel etc.) skip the
  // fetch entirely.
  if (!BACKEND_URL) return getFallbackData();

  try {
    const data = await fetchPortfolioFromAPI();
    // If DB is empty (seeding hasn't happened yet), fall back to static data
    if (
      !data.experiences?.length &&
      !data.skillCategories?.length &&
      !data.projects?.length
    ) {
      return getFallbackData();
    }
    return data;
  } catch {
    console.warn("Portfolio API fetch failed, using fallback data");
    return getFallbackData();
  }
}
