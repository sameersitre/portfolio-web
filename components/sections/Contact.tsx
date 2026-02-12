"use client";

import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/data";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

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
  {
    icon: <Mail size={16} />,
    label: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: <Phone size={16} />,
    label: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
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
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

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

  const isValid =
    formState.name.trim() && formState.email.trim() && formState.message.trim();

  return (
    <Section id="contact">
      <SectionHeading title="Get In Touch" subtitle="Let's work together" />

      <div className="flex flex-col gap-12">
        {/* Info */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-2xl space-y-8"
        >
          <motion.p variants={item} className="text-muted-foreground">
            I&apos;m currently open to new opportunities and interesting
            projects. Whether you have a question or just want to say hi, my
            inbox is always open.
          </motion.p>
        </motion.div>
        {/* Contact details */}
        <div className="flex flex-row items-end w-full gap-12 md:flex-row justify-between">
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
        </div>
      </div>
    </Section>
  );
}
