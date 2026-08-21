// Public entry point for GitHub data.
// fetchGitHubData() tries the live GraphQL fetcher and falls back to the
// deterministic mock on any error. Existing imports of "@/lib/github" keep
// working because TypeScript resolves the directory via index.ts.

import { fetchGitHubGraphQL } from "@/lib/github/query";
import { getFallbackData } from "@/lib/github/mock";
import type { GitHubData } from "@/lib/github/types";

export type {
  ContributionDay,
  ContributionWeek,
  YearContribution,
  GitHubStats,
  PinnedRepo,
  GitHubData,
} from "@/lib/github/types";

export async function fetchGitHubData(): Promise<GitHubData> {
  try {
    return await fetchGitHubGraphQL();
  } catch (error) {
    console.warn("GitHub API fetch failed, using fallback data:", error);
    return getFallbackData();
  }
}
