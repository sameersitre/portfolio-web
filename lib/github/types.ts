// Public types consumed by GitHub section components, plus internal GraphQL
// response shapes used only by query.ts.

// ─── Public types ─────────────────────────────────────────────────────────────

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  // True for cells that fall inside the requested year. False for week-alignment
  // filler cells (days before Jan 1 or after the year's end / today). Renderers
  // can use this to suppress hover/tooltip on out-of-range cells.
  inRange: boolean;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface YearContribution {
  year: number;
  weeks: ContributionWeek[];
  total: number;
}

export interface GitHubStats {
  totalContributions: number;
  publicRepos: number;
  totalStars: number;
  followers: number;
}

export interface PinnedRepo {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  url: string;
}

export interface GitHubData {
  stats: GitHubStats;
  pinnedRepos: PinnedRepo[];
  years: YearContribution[];
  availableYears: number[];
}

// ─── GraphQL response shape ───────────────────────────────────────────────────
// Mirrors the structure returned by the GraphQL query in query.ts.
// Per-year contribution buckets are added dynamically via the `year_<N>` index
// signature.

export interface GraphQLContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: string;
}

export interface GraphQLContributionWeek {
  contributionDays: GraphQLContributionDay[];
}

export interface GraphQLContributionsCollection {
  contributionCalendar: {
    totalContributions: number;
    weeks: GraphQLContributionWeek[];
  };
}

export interface GraphQLPinnedRepo {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string; color: string } | null;
}

export interface GitHubGraphQLUser {
  repositories: {
    totalCount: number;
    nodes: { stargazerCount: number }[];
  };
  followers: { totalCount: number };
  pinnedItems: { nodes: GraphQLPinnedRepo[] };
  // Dynamic per-year keys: year_2018, year_2019, ...
  [yearKey: string]: unknown;
}

export interface GitHubGraphQLResponse {
  data: { user: GitHubGraphQLUser };
  errors?: { message: string }[];
}
