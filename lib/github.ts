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

// Seeded random for deterministic contributions per year
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateContributionsForYear(year: number): YearContribution {
  const weeks: ContributionWeek[] = [];
  const now = new Date();
  const currentYear = now.getFullYear();
  const rand = seededRandom(year * 1000 + 42);

  let startDate: Date;
  let endDate: Date;

  if (year === currentYear) {
    // Current year: Jan 1 to today
    startDate = new Date(year, 0, 1);
    endDate = now;
  } else {
    // Past year: Jan 1 to Dec 31
    startDate = new Date(year, 0, 1);
    endDate = new Date(year, 11, 31);
  }

  // Align start to Sunday
  const alignedStart = new Date(startDate);
  alignedStart.setDate(alignedStart.getDate() - alignedStart.getDay());

  let totalDays = 0;
  let current = new Date(alignedStart);

  while (current <= endDate || weeks.length < 53) {
    const days: ContributionDay[] = [];

    for (let d = 0; d < 7; d++) {
      const date = new Date(current);
      date.setDate(date.getDate() + d);

      const isBeforeStart = date < startDate;
      const isAfterEnd = date > endDate;

      if (isBeforeStart || isAfterEnd) {
        days.push({ date: date.toISOString().split("T")[0], count: 0, level: 0 });
        continue;
      }

      const dayOfWeek = date.getDay();
      const isWeekday = dayOfWeek > 0 && dayOfWeek < 6;
      const random = rand();

      let count = 0;
      if (isWeekday) {
        if (random > 0.15) count = Math.floor(rand() * 12) + 1;
      } else {
        if (random > 0.5) count = Math.floor(rand() * 6) + 1;
      }

      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (count > 0) level = 1;
      if (count > 3) level = 2;
      if (count > 6) level = 3;
      if (count > 9) level = 4;

      days.push({ date: date.toISOString().split("T")[0], count, level });
      totalDays += count;
    }

    weeks.push({ days });
    current.setDate(current.getDate() + 7);

    // Stop after we pass the end date and have at least 52 weeks
    if (current > endDate && weeks.length >= 52) break;
  }

  return { year, weeks, total: totalDays };
}

// Available years (career start 2018 to current)
export function getAvailableYears(): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = currentYear; y >= 2018; y--) {
    years.push(y);
  }
  return years;
}

export function getContributionsForYear(year: number): YearContribution {
  return generateContributionsForYear(year);
}

// Static mock data — replace with GitHub GraphQL API calls when token is available
export function getGitHubStats(): { stats: GitHubStats; pinnedRepos: PinnedRepo[] } {
  const stats: GitHubStats = {
    totalContributions: 2847,
    publicRepos: 24,
    totalStars: 42,
    followers: 18,
  };

  const pinnedRepos: PinnedRepo[] = [
    {
      name: "bingefeast",
      description: "PWA for discovering movies & TV shows across streaming platforms",
      language: "TypeScript",
      languageColor: "#3178c6",
      stars: 12,
      forks: 3,
      url: "https://github.com/sameersitre/bingefeast",
    },
    {
      name: "bingee",
      description: "React Native mobile app for movie discovery with native animations",
      language: "TypeScript",
      languageColor: "#3178c6",
      stars: 8,
      forks: 2,
      url: "https://github.com/sameersitre/bingee",
    },
    {
      name: "binge-server",
      description: "Node.js backend server with Express, MongoDB, and TMDB API integration",
      language: "JavaScript",
      languageColor: "#f1e05a",
      stars: 5,
      forks: 1,
      url: "https://github.com/sameersitre/binge-server",
    },
    {
      name: "gifting-sdk",
      description: "Reusable npm package for loyalty program gifting functionality",
      language: "TypeScript",
      languageColor: "#3178c6",
      stars: 4,
      forks: 1,
      url: "https://github.com/sameersitre/gifting-sdk",
    },
  ];

  return { stats, pinnedRepos };
}
