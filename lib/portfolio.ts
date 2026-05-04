// Server-side portfolio data fetcher with static fallback.
// Tries the backend's /api/v2/portfolio/content; on failure or empty response,
// returns the bundled static content.

import { experiences, skillCategories, projects } from "@/lib/data";

const BACKEND_URL =
  process.env.BACKEND_INTERNAL_URL ?? "http://backend:8000";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Experience = (typeof experiences)[number];
export type SkillCategory = (typeof skillCategories)[number];
export type Project = (typeof projects)[number];

export interface PortfolioData {
  experiences: Experience[];
  skillCategories: SkillCategory[];
  projects: Project[];
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

  return res.json();
}

// ─── Fallback to static data.ts ──────────────────────────────────────────────

function getFallbackData(): PortfolioData {
  return { experiences, skillCategories, projects };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function fetchPortfolioData(): Promise<PortfolioData> {
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
