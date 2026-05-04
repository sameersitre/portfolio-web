"use client";

// Contact section: short blurb, contact details, and social links row.

import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  trackContact,
  type ContactMethod,
} from "@/lib/analytics/events";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { siteConfig } from "@/lib/data";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

const socialLinks: {
  label: string;
  href: string;
  icon: React.ReactNode;
  method: ContactMethod;
}[] = [
  {
    label: "GitHub",
    href: siteConfig.links.github,
    icon: <GithubIcon size={20} />,
    method: "github",
  },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    icon: <LinkedinIcon size={20} />,
    method: "linkedin",
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: <Mail size={20} />,
    method: "email",
  },
];

type ContactRow =
  | {
      icon: React.ReactNode;
      label: string;
      href: string;
      method: ContactMethod;
    }
  | { icon: React.ReactNode; label: string; href?: undefined };

const contactInfo: ContactRow[] = [
  {
    icon: <Mail size={16} />,
    label: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    method: "email",
  },
  {
    icon: <Phone size={16} />,
    label: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    method: "phone",
  },
  { icon: <MapPin size={16} />, label: siteConfig.location },
];

const container = staggerContainer(0.1);
const item = fadeUp();

export function Contact() {
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
              if (info.href) {
                return (
                  <a
                    key={info.label}
                    href={info.href}
                    onClick={() => trackContact(info.method, info.href)}
                    className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    <span className="text-accent">{info.icon}</span>
                    {info.label}
                  </a>
                );
              }
              return (
                <span
                  key={info.label}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <span className="text-accent">{info.icon}</span>
                  {info.label}
                </span>
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
                onClick={() => trackContact(link.method, link.href)}
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
