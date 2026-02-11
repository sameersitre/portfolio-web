import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Home() {
  return (
    <>
      <Hero />
      <About />

      <Experience />

      <Skills />

      <Projects />

      {/* GitHub */}
      <Section id="github">
        <SectionHeading title="GitHub" subtitle="My open source activity" />
        <p className="text-muted-foreground">
          GitHub contributions section coming soon...
        </p>
      </Section>

      {/* Contact */}
      <Section id="contact">
        <SectionHeading title="Get In Touch" subtitle="Let's work together" />
        <p className="max-w-lg text-muted-foreground">
          I&apos;m currently open to new opportunities and interesting projects.
          Whether you have a question or just want to say hi, my inbox is always
          open.
        </p>
        <a
          href="mailto:sameersitre@gmail.com"
          className="mt-8 inline-block rounded-full border border-accent bg-accent/10 px-8 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
        >
          Say Hello
        </a>
      </Section>
    </>
  );
}
