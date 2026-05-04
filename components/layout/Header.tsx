"use client";

// Site header: brand, primary nav (with scroll-spy active section), theme toggle,
// resume link, and mobile menu drawer.

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import {
  trackNav,
  trackOutbound,
  trackResumeView,
  type NavSection,
  type NavSurface,
} from "@/lib/analytics/events";
import { navItems, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

// Pixels of vertical scroll before the header switches to the blurred state.
const SCROLL_THRESHOLD_PX = 50;
// A section is considered "active" once its top is within this many pixels of the viewport top.
const ACTIVE_SECTION_OFFSET_PX = 120;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Toggle the blurred header background once the user has scrolled past the threshold.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track the active section via IntersectionObserver instead of reading
  // getBoundingClientRect() on every scroll frame. The rootMargin defines a
  // narrow band starting at ACTIVE_SECTION_OFFSET_PX from the top; whichever
  // section's top crosses into that band becomes active.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${ACTIVE_SECTION_OFFSET_PX}px 0px -60% 0px`,
        threshold: 0,
      },
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string, surface: NavSurface) => {
    setIsMobileMenuOpen(false);
    trackNav(href.replace("#", "") as NavSection, surface);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackNav("home", "desktop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          onClick={handleLogoClick}
          className="text-lg font-bold tracking-tight text-foreground"
        >
          {siteConfig.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleNavClick(item.href, "desktop")}
                className={cn(
                  "text-sm transition-colors hover:text-accent",
                  activeSection === item.href.replace("#", "")
                    ? "text-accent"
                    : "text-muted-foreground",
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href={siteConfig.links.sourceRepo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackOutbound(siteConfig.links.sourceRepo, "source_repo_header")
            }
            className="text-muted-foreground transition-colors hover:text-accent"
            aria-label="View source on GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackResumeView("desktop")}
            className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackResumeView("mobile")}
            className="inline-flex items-center rounded-full border border-accent bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
          >
            Resume
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href, "mobile")}
                    className={cn(
                      "w-full rounded-lg px-4 py-3 text-left text-sm transition-colors hover:bg-muted",
                      activeSection === item.href.replace("#", "")
                        ? "text-accent"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="mt-2 flex items-center gap-3">
                <a
                  href={siteConfig.links.sourceRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackOutbound(
                      siteConfig.links.sourceRepo,
                      "source_repo_header_mobile",
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
                  aria-label="View source on GitHub"
                >
                  <GithubIcon size={16} />
                  Source
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
