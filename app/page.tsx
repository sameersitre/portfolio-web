import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section id="hero" className="flex min-h-screen items-center px-6">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 font-mono text-sm text-accent">Hi, my name is</p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Sameer Sitre<span className="text-accent">.</span>
          </h1>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-muted-foreground sm:text-5xl md:text-6xl">
            I build things for the web.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Senior Frontend Engineer with 7+ years of experience delivering
            secure, scalable web and mobile applications. Currently building
            high-impact solutions at{" "}
            <span className="text-accent">The Real Brokerage</span>.
          </p>
          <div className="mt-10 flex gap-4">
            <a
              href="#contact"
              className="rounded-full border border-accent bg-accent/10 px-6 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              See My Work
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about">
        <SectionHeading
          title="About"
          subtitle="A few things about me"
        />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-muted-foreground">
            <p>
              I&apos;m a software engineer who loves building products that people
              actually use. With 7+ years in the industry, I&apos;ve shipped
              production features to thousands of users across global markets.
            </p>
            <p>
              My expertise spans web and mobile development — from design system
              architecture and performance optimisation to end-to-end test
              automation and security hardening.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me cycling, playing chess, or
              exploring the latest in AI-driven development workflows.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-64 w-64 rounded-2xl border-2 border-accent/20 bg-muted" />
          </div>
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience">
        <SectionHeading
          title="Experience"
          subtitle="Where I've worked"
        />
        <p className="text-muted-foreground">Experience section coming soon...</p>
      </Section>

      {/* Skills */}
      <Section id="skills">
        <SectionHeading
          title="Skills"
          subtitle="Technologies I work with"
        />
        <p className="text-muted-foreground">Skills section coming soon...</p>
      </Section>

      {/* Projects */}
      <Section id="projects">
        <SectionHeading
          title="Projects"
          subtitle="Things I've built"
        />
        <p className="text-muted-foreground">Projects section coming soon...</p>
      </Section>

      {/* GitHub */}
      <Section id="github">
        <SectionHeading
          title="GitHub"
          subtitle="My open source activity"
        />
        <p className="text-muted-foreground">GitHub contributions section coming soon...</p>
      </Section>

      {/* Contact */}
      <Section id="contact">
        <SectionHeading
          title="Get In Touch"
          subtitle="Let's work together"
        />
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
