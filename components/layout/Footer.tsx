import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-6">
          <p className="text-center text-sm text-muted-foreground">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>

          <p className="text-center text-xs text-muted-foreground/60">
            &copy; {currentYear} {siteConfig.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}
