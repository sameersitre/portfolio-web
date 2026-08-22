/**
 * Publishes lib/content/* through the portfolio API.
 *
 * The site reads content from the API ONLY (lib/portfolio.ts has no static fallback), so
 * this script is what puts anything there. `lib/content/*` stays the authoring source —
 * edit it in a PR, then re-run this to publish.
 *
 *   npm run seed:portfolio              # target API_BASE_URL from .env.deploy
 *   npm run seed:portfolio -- --local   # target http://localhost:8000
 *
 * Config comes from .env.deploy (see .env.deploy.example), falling back to .env.local.
 * Both are gitignored — THIS REPO IS PUBLIC.
 *
 * Runs on Node's native type stripping (v22.6+), so it needs no ts-runner dependency —
 * which is why the relative imports carry an explicit `.ts` extension.
 *
 * Seeds ALL THREE types or exits non-zero. A partial seed is the one genuinely bad
 * outcome: the reader treats "some content" as success, so a half-seeded DB renders a
 * portfolio silently missing a whole section.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { experiences } from "../lib/content/experiences.ts";
import { projects } from "../lib/content/projects.ts";
import { skillCategories } from "../lib/content/skills.ts";

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// .env.deploy first (the deploy/seed target), then .env.local (dev). Neither is required —
// every value can also come from the real environment.
for (const f of [".env.deploy", ".env.local"]) {
  const p = resolve(REPO, f);
  if (existsSync(p)) process.loadEnvFile(p);
}

const useLocal = process.argv.includes("--local");
const BASE = (
  useLocal
    ? "http://localhost:8000"
    : process.env.PORTFOLIO_API_URL || process.env.API_BASE_URL || ""
).replace(/\/+$/, "");

const PAYLOADS = [
  { type: "experiences", data: experiences },
  { type: "skillCategories", data: skillCategories },
  { type: "projects", data: projects },
] as const;

/**
 * `/portfolio/seed` is requireInternalAuth — the header must equal the backend's AUTH_SECRET.
 *
 * When INTERNAL_SECRET is not supplied, read it straight out of the RUNNING backend container
 * rather than parsing the VM's .env: a naive `grep '^AUTH_SECRET=' | cut -d= -f2-` mangles a
 * quoted value that itself contains '=' (it yielded 103 chars against a real 44) and then 401s
 * in a way that looks like a permissions problem. `process.env` inside the container is by
 * definition the value the server compares against.
 */
function resolveSecret(): string {
  const direct = process.env.INTERNAL_SECRET?.trim();
  if (direct) return direct;

  const { VM_HOST, VM_USER, VM_KEY } = process.env;
  const container = process.env.BACKEND_CONTAINER || "trovie-backend-1";
  if (!VM_HOST || !VM_USER || !VM_KEY) {
    throw new Error(
      "INTERNAL_SECRET is empty and VM_HOST/VM_USER/VM_KEY are not set, so the secret cannot " +
        "be read from the backend container. Fill in .env.deploy (see .env.deploy.example).",
    );
  }

  console.log(`  reading AUTH_SECRET from ${container} on ${VM_HOST} …`);
  const secret = execFileSync(
    "ssh",
    [
      "-o",
      "ConnectTimeout=10",
      "-o",
      "StrictHostKeyChecking=accept-new",
      "-i",
      VM_KEY.replace(/^~/, process.env.HOME ?? "~"),
      `${VM_USER}@${VM_HOST}`,
      `docker exec ${container} node -e 'process.stdout.write(process.env.AUTH_SECRET || "")'`,
    ],
    { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] },
  ).trim();

  if (!secret) throw new Error(`${container} reported an empty AUTH_SECRET`);
  return secret;
}

async function seedOne(
  type: string,
  data: readonly unknown[],
  secret: string,
): Promise<void> {
  const res = await fetch(`${BASE}/api/v2/portfolio/seed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-secret": secret,
    },
    body: JSON.stringify({ type, data }),
  });

  const body = await res.text();
  if (!res.ok) throw new Error(`${type}: HTTP ${res.status} — ${body}`);
  console.log(`  ✓ ${type.padEnd(16)} ${body}`);
}

async function main(): Promise<void> {
  if (!BASE) {
    throw new Error(
      "No target. Set API_BASE_URL in .env.deploy, pass PORTFOLIO_API_URL, or use --local.",
    );
  }

  const secret = resolveSecret();
  console.log(`Seeding portfolio content → ${BASE}`);
  for (const { type, data } of PAYLOADS) {
    await seedOne(type, data, secret);
  }

  // Read back through the PUBLIC endpoint the site actually uses, so the check exercises the
  // same path rather than trusting the write's own response.
  const verify = await fetch(`${BASE}/api/v2/portfolio/content`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });
  if (!verify.ok) throw new Error(`verify: HTTP ${verify.status}`);

  const content = (await verify.json()) as Record<string, unknown[]>;
  console.log(
    `Verified via /portfolio/content: ${Object.entries(content)
      .map(([k, v]) => `${k}=${v.length}`)
      .join("  ")}`,
  );

  const empty = Object.entries(content).filter(([, v]) => !v.length);
  if (empty.length) {
    throw new Error(
      `these types read back EMPTY: ${empty.map(([k]) => k).join(", ")}`,
    );
  }
}

main().catch((err: unknown) => {
  console.error(`Seed failed: ${err instanceof Error ? err.message : err}`);
  process.exit(1);
});
