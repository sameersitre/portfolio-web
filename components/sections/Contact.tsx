"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, MapPin, Phone, Loader2, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    label: "GitHub",
    href: siteConfig.links.github,
    icon: <Github size={20} />,
  },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    icon: <Linkedin size={20} />,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: <Mail size={20} />,
  },
];

const contactInfo = [
  { icon: <Mail size={16} />, label: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: <Phone size={16} />, label: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
  { icon: <MapPin size={16} />, label: siteConfig.location, href: undefined },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // TODO: Replace with actual form submission (Resend, Formspree, or Server Action)
    // Simulating submission for now
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("sent");
    setFormState({ name: "", email: "", message: "" });

    setTimeout(() => setStatus("idle"), 4000);
  };

  const isValid = formState.name.trim() && formState.email.trim() && formState.message.trim();

  return (
    <Section id="contact">
      <SectionHeading title="Get In Touch" subtitle="Let's work together" />

      <div className="grid gap-12 md:grid-cols-5">
        {/* Left — info + socials */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-8 md:col-span-2"
        >
          <motion.p variants={item} className="text-muted-foreground">
            I&apos;m currently open to new opportunities and interesting
            projects. Whether you have a question or just want to say hi, my
            inbox is always open.
          </motion.p>

          {/* Contact details */}
          <motion.div variants={item} className="space-y-3">
            {contactInfo.map((info) => {
              const Wrapper = info.href ? "a" : "span";
              return (
                <Wrapper
                  key={info.label}
                  {...(info.href ? { href: info.href } : {})}
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  <span className="text-accent">{info.icon}</span>
                  {info.label}
                </Wrapper>
              );
            })}
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — contact form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" as const }}
          className="space-y-4 md:col-span-3"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                className="w-full rounded-lg border border-border bg-muted/50 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                className="w-full rounded-lg border border-border bg-muted/50 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formState.message}
              onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
              className="w-full resize-none rounded-lg border border-border bg-muted/50 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent focus:ring-1 focus:ring-accent"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            disabled={!isValid || status === "sending" || status === "sent"}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all",
              status === "sent"
                ? "border border-green-500/30 bg-green-500/10 text-green-500"
                : "border border-accent bg-accent/10 text-accent hover:bg-accent/20",
              (!isValid || status === "sending") && "cursor-not-allowed opacity-50"
            )}
          >
            {status === "sending" && <Loader2 size={16} className="animate-spin" />}
            {status === "sent" && <CheckCircle2 size={16} />}
            {status === "idle" && <Send size={16} />}
            {status === "error" && <Send size={16} />}
            {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent!" : "Send Message"}
          </button>
        </motion.form>
      </div>
    </Section>
  );
}
