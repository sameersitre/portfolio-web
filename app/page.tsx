import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { GitHub } from "@/components/sections/GitHub";
import { Contact } from "@/components/sections/Contact";
import { fetchGitHubData } from "@/lib/github";

export default async function Home() {
  const githubData = await fetchGitHubData();

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <GitHub data={githubData} />
      <Contact />
    </>
  );
}
