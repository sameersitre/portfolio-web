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
