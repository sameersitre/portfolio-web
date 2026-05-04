// Deterministic mock GitHub data used when the live fetch fails or
// GITHUB_TOKEN is not set. Same shape as the real API response so
// downstream code stays oblivious.

import type {
  ContributionDay,
  ContributionWeek,
  GitHubData,
  YearContribution,
} from "@/lib/github/types";

const FALLBACK_START_YEAR = 2018;

// Linear-congruential PRNG so the mock heatmap is stable across renders.
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
        days.push({
          date: date.toISOString().split("T")[0],
          count: 0,
          level: 0,
        });
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

export function getFallbackData(): GitHubData {
  const currentYear = new Date().getFullYear();
  const availableYears: number[] = [];
  for (let y = currentYear; y >= FALLBACK_START_YEAR; y--) availableYears.push(y);

  const years = availableYears.map(generateMockYear);
  const totalContributions = years.reduce((s, y) => s + y.total, 0);

  return {
    stats: { totalContributions, publicRepos: 24, totalStars: 42, followers: 18 },
    pinnedRepos: [
      {
        name: "bingefeast",
        description:
          "PWA for discovering movies & TV shows across streaming platforms",
        language: "TypeScript",
        languageColor: "#3178c6",
        stars: 12,
        forks: 3,
        url: "https://github.com/sameersitre/bingefeast",
      },
      {
        name: "bingee",
        description:
          "React Native mobile app for movie discovery with native animations",
        language: "TypeScript",
        languageColor: "#3178c6",
        stars: 8,
        forks: 2,
        url: "https://github.com/sameersitre/bingee",
      },
      {
        name: "binge-server",
        description:
          "Node.js backend server with Express, MongoDB, and TMDB API integration",
        language: "JavaScript",
        languageColor: "#f1e05a",
        stars: 5,
        forks: 1,
        url: "https://github.com/sameersitre/binge-server",
      },
      {
        name: "gifting-sdk",
        description:
          "Reusable npm package for loyalty program gifting functionality",
        language: "TypeScript",
        languageColor: "#3178c6",
        stars: 4,
        forks: 1,
        url: "https://github.com/sameersitre/gifting-sdk",
      },
    ],
    years,
    availableYears,
  };
}
