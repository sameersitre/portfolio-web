// Live GitHub GraphQL fetcher. Builds a single query covering pinned repos,
// repo stats, follower count, and per-year contribution calendars.
// Throws on any failure so the caller can fall back to mock data.

import type {
  ContributionWeek,
  GitHubData,
  GitHubGraphQLResponse,
  GraphQLContributionsCollection,
  PinnedRepo,
  YearContribution,
} from "@/lib/github/types";

const GITHUB_USERNAME = "sameersitre";
const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const CONTRIBUTION_START_YEAR = 2018;
const REVALIDATE_SECONDS = 86400; // 24 hours

function mapContributionLevel(level: string): 0 | 1 | 2 | 3 | 4 {
  switch (level) {
    case "FIRST_QUARTILE":
      return 1;
    case "SECOND_QUARTILE":
      return 2;
    case "THIRD_QUARTILE":
      return 3;
    case "FOURTH_QUARTILE":
      return 4;
    default:
      return 0;
  }
}

export async function fetchGitHubGraphQL(): Promise<GitHubData> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN not set");
  }

  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = currentYear; y >= CONTRIBUTION_START_YEAR; y--) {
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
        }`,
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
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const json = (await response.json()) as GitHubGraphQLResponse;

  if (json.errors) {
    throw new Error(`GitHub GraphQL error: ${json.errors[0]?.message}`);
  }

  const user = json.data.user;

  const totalStars = user.repositories.nodes.reduce(
    (sum, repo) => sum + repo.stargazerCount,
    0,
  );

  const yearContributions: YearContribution[] = years.map((year) => {
    const yearData = user[`year_${year}`] as GraphQLContributionsCollection;
    const calendar = yearData.contributionCalendar;

    const weeks: ContributionWeek[] = calendar.weeks.map((week) => ({
      days: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: mapContributionLevel(day.contributionLevel),
        // GitHub's GraphQL calendar only returns days inside the requested
        // window, so every day from the API is in-range.
        inRange: true,
      })),
    }));

    return {
      year,
      weeks,
      total: calendar.totalContributions,
    };
  });

  const totalContributions = yearContributions.reduce(
    (sum, y) => sum + y.total,
    0,
  );

  const pinnedRepos: PinnedRepo[] = user.pinnedItems.nodes.map((repo) => ({
    name: repo.name,
    description: repo.description || "",
    language: repo.primaryLanguage?.name || "Unknown",
    languageColor: repo.primaryLanguage?.color || "#8b8b8b",
    stars: repo.stargazerCount,
    forks: repo.forkCount,
    url: repo.url,
  }));

  return {
    stats: {
      totalContributions,
      publicRepos: user.repositories.totalCount,
      totalStars,
      followers: user.followers.totalCount,
    },
    pinnedRepos,
    years: yearContributions,
    availableYears: years,
  };
}
