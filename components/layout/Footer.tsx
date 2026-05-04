// Site footer: tech stack credit, copyright, and build version.

import { siteConfig } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const version = process.env.NEXT_PUBLIC_APP_VERSION;

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-6">
          <p className="text-center text-sm text-muted-foreground">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>

          <div className="relative w-full">
            <p className="text-center text-xs text-muted-foreground/60">
              &copy; {currentYear} {siteConfig.name}.
            </p>
            {version ? (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground/40">
                v{version}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
