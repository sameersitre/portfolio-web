# syntax=docker/dockerfile:1.7

# ─── Base ────────────────────────────────────────────
FROM node:20.18-slim AS base
WORKDIR /app

# ─── Stage 1: Install dependencies ──────────────────
FROM base AS deps

COPY package.json package-lock.json* ./
# BuildKit cache mount keeps the npm cache across builds.
RUN --mount=type=cache,target=/root/.npm \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 60000 && \
    npm config set fetch-retry-maxtimeout 300000 && \
    npm ci

# ─── Stage 2: Build the application ─────────────────
FROM base AS builder
WORKDIR /app

# NEXT_PUBLIC_* env vars must be present *during* `next build` because Next.js
# inlines them into the client bundle. Pass them in via --build-arg.
ARG NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}

# The site has NO static fallback — content comes only from the portfolio API — so `next build`
# must be able to REACH that API to prerender `/`, or the export fails by design. Compose injects
# BACKEND_INTERNAL_URL (http://backend:8000) at RUNTIME only, and that host does not resolve from
# a build container, so the build is given the PUBLIC base URL instead.
#
# Scoped to this stage on purpose: the `runner` stage below is a separate FROM and does NOT
# inherit it, so at runtime the value still comes from compose (the fast in-network URL) and
# ISR revalidation keeps using that — the public URL is only ever a build-time input.
ARG BACKEND_INTERNAL_URL
ENV BACKEND_INTERNAL_URL=${BACKEND_INTERNAL_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ─── Stage 3: Production runner ─────────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# System user with no shell and no home dir — minimal attack surface.
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs \
            --no-create-home --shell /usr/sbin/nologin nextjs

# Copy only what's needed for production
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://localhost:3000').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
