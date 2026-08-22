import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { GitHub } from "@/components/sections/github/GitHub";
import { Contact } from "@/components/sections/Contact";
import { fetchGitHubData } from "@/lib/github";
import { fetchPortfolioData } from "@/lib/portfolio";
import { buildHomepageJsonLd } from "@/lib/seo/jsonLd";

// Force ISR at the route level — revalidate every 5 minutes
// This ensures the page re-renders even when build-time fetches fail
export const revalidate = 300;

export default async function Home() {
  const [githubData, portfolioData] = await Promise.all([
    fetchGitHubData(),
    fetchPortfolioData(),
  ]);

  return (
    <>
      {/* Structured data built from the same payload the sections render, so the
          schema.org profile tracks the published content automatically. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildHomepageJsonLd(portfolioData)),
        }}
      />
      <Hero />
      <About
        paragraphs={portfolioData.aboutParagraphs}
        stats={portfolioData.stats}
      />
      <Experience experiences={portfolioData.experiences} />
      <Skills skillCategories={portfolioData.skillCategories} />
      <Projects projects={portfolioData.projects} />
      <GitHub data={githubData} />
      <Contact />
    </>
  );
}
