const GITHUB_USERNAME = "sameersitre";
const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
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

function mapContributionLevel(level: string): 0 | 1 | 2 | 3 | 4 {
  switch (level) {
    case "FIRST_QUARTILE": return 1;
    case "SECOND_QUARTILE": return 2;
    case "THIRD_QUARTILE": return 3;
    case "FOURTH_QUARTILE": return 4;
    default: return 0;
  }
}

// Fetch all GitHub data in a single GraphQL query
async function fetchGitHubGraphQL(): Promise<GitHubData> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN not set");
  }

  const currentYear = new Date().getFullYear();
  const startYear = 2018;
  const years: number[] = [];
  for (let y = currentYear; y >= startYear; y--) {
    years.push(y);
  }

  // Build contribution queries for each year
  const contributionQueries = years
    .map(
      (year) =>
        `year_${year}: contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year === currentYear ? new Date().toISOString() : `${year}-12-31T23:59:59Z`}") {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }`
    )
    .join("\n");

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        repositories(first: 100, ownerAffiliations: OWNER, orderBy: { field: STARGAZERS, direction: DESC }) {
          totalCount
          nodes {
            stargazerCount
          }
        }
        followers {
          totalCount
        }
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
            }
          }
        }
        ${contributionQueries}
      }
    }
  `;

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 86400 }, // ISR: revalidate every 24 hours
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(`GitHub GraphQL error: ${json.errors[0]?.message}`);
  }

  const user = json.data.user;

  // Parse stats
  const totalStars = user.repositories.nodes.reduce(
    (sum: number, repo: { stargazerCount: number }) => sum + repo.stargazerCount,
    0
  );

  // Parse contributions per year
  const yearContributions: YearContribution[] = years.map((year) => {
    const yearData = user[`year_${year}`];
    const calendar = yearData.contributionCalendar;

    const weeks: ContributionWeek[] = calendar.weeks.map(
      (week: { contributionDays: Array<{ date: string; contributionCount: number; contributionLevel: string }> }) => ({
        days: week.contributionDays.map(
          (day: { date: string; contributionCount: number; contributionLevel: string }) => ({
            date: day.date,
            count: day.contributionCount,
            level: mapContributionLevel(day.contributionLevel),
          })
        ),
      })
    );

    return {
      year,
      weeks,
      total: calendar.totalContributions,
    };
  });

  const totalContributions = yearContributions.reduce((sum, y) => sum + y.total, 0);

  // Parse pinned repos
  const pinnedRepos: PinnedRepo[] = user.pinnedItems.nodes.map(
    (repo: {
      name: string;
      description: string | null;
      url: string;
      stargazerCount: number;
      forkCount: number;
      primaryLanguage: { name: string; color: string } | null;
    }) => ({
      name: repo.name,
      description: repo.description || "",
      language: repo.primaryLanguage?.name || "Unknown",
      languageColor: repo.primaryLanguage?.color || "#8b8b8b",
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      url: repo.url,
    })
  );

  return {
    stats: {
      totalContributions,
      publicRepos: user.repositories.totalCount,
      totalStars: totalStars,
      followers: user.followers.totalCount,
    },
    pinnedRepos,
    years: yearContributions,
    availableYears: years,
  };
}

// ─── Fallback mock data ───────────────────────────────────────────────────────

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateMockYear(year: number): YearContribution {
  const weeks: ContributionWeek[] = [];
  const now = new Date();
  const currentYear = now.getFullYear();
  const rand = seededRandom(year * 1000 + 42);

  const startDate = new Date(year, 0, 1);
  const endDate = year === currentYear ? now : new Date(year, 11, 31);
  const alignedStart = new Date(startDate);
  alignedStart.setDate(alignedStart.getDate() - alignedStart.getDay());

  let total = 0;
  const current = new Date(alignedStart);

  while (current <= endDate || weeks.length < 52) {
    const days: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(current);
      date.setDate(date.getDate() + d);

      if (date < startDate || date > endDate) {
        days.push({ date: date.toISOString().split("T")[0], count: 0, level: 0 });
        continue;
      }

      const dayOfWeek = date.getDay();
      const isWeekday = dayOfWeek > 0 && dayOfWeek < 6;
      const r = rand();
      let count = 0;
      if (isWeekday) {
        if (r > 0.15) count = Math.floor(rand() * 12) + 1;
      } else {
        if (r > 0.5) count = Math.floor(rand() * 6) + 1;
      }

      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (count > 0) level = 1;
      if (count > 3) level = 2;
      if (count > 6) level = 3;
      if (count > 9) level = 4;

      days.push({ date: date.toISOString().split("T")[0], count, level });
      total += count;
    }
    weeks.push({ days });
    current.setDate(current.getDate() + 7);
    if (current > endDate && weeks.length >= 52) break;
  }

  return { year, weeks, total };
}

function getFallbackData(): GitHubData {
  const currentYear = new Date().getFullYear();
  const availableYears: number[] = [];
  for (let y = currentYear; y >= 2018; y--) availableYears.push(y);

  const years = availableYears.map(generateMockYear);
  const totalContributions = years.reduce((s, y) => s + y.total, 0);

  return {
    stats: { totalContributions, publicRepos: 24, totalStars: 42, followers: 18 },
    pinnedRepos: [
      { name: "bingefeast", description: "PWA for discovering movies & TV shows across streaming platforms", language: "TypeScript", languageColor: "#3178c6", stars: 12, forks: 3, url: "https://github.com/sameersitre/bingefeast" },
      { name: "bingee", description: "React Native mobile app for movie discovery with native animations", language: "TypeScript", languageColor: "#3178c6", stars: 8, forks: 2, url: "https://github.com/sameersitre/bingee" },
      { name: "binge-server", description: "Node.js backend server with Express, MongoDB, and TMDB API integration", language: "JavaScript", languageColor: "#f1e05a", stars: 5, forks: 1, url: "https://github.com/sameersitre/binge-server" },
      { name: "gifting-sdk", description: "Reusable npm package for loyalty program gifting functionality", language: "TypeScript", languageColor: "#3178c6", stars: 4, forks: 1, url: "https://github.com/sameersitre/gifting-sdk" },
    ],
    years,
    availableYears,
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function fetchGitHubData(): Promise<GitHubData> {
  try {
    return await fetchGitHubGraphQL();
  } catch (error) {
    console.warn("GitHub API fetch failed, using fallback data:", error);
    return getFallbackData();
  }
}
