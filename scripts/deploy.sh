#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────
# portfolio-web — build locally, ship the image to the VM
#
# Standalone: this repo does NOT need trovie/infra/deploy.sh to deploy itself.
# It still targets the SAME compose stack (the `portfolio` service in
# trovie/infra/docker-compose.prod.yml), because that stack owns nginx, TLS and the
# backend this site reads from — this script only rebuilds and swaps THIS service.
#
#   ./scripts/deploy.sh            # build + deploy
#   ./scripts/deploy.sh --bump patch|minor|major
#   ./scripts/deploy.sh --build-only
#
# THIS REPO IS PUBLIC — no host, user, key path or domain is hardcoded here.
# All of it comes from .env.deploy (gitignored). See .env.deploy.example.
# ─────────────────────────────────────────────────────────
set -euo pipefail

# Resolve paths from THIS script, never the caller's cwd — the exact bug that made
# trovie's deploy.sh silently skip the portfolio env merge for weeks.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "$REPO_DIR"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; CYAN='\033[0;36m'; NC='\033[0m'
log()  { echo -e "${BLUE}▸${NC} $1"; }
ok()   { echo -e "${GREEN}✓${NC} $1"; }
warn() { echo -e "${YELLOW}⚠${NC} $1"; }
err()  { echo -e "${RED}✗${NC} $1"; }
info() { echo -e "${CYAN}ℹ${NC} $1"; }

# ─── Config ──────────────────────────────────────────────
ENV_DEPLOY="${REPO_DIR}/.env.deploy"
if [[ ! -f "$ENV_DEPLOY" ]]; then
  err "Missing ${ENV_DEPLOY}"
  warn "Copy .env.deploy.example → .env.deploy and fill it in (it is gitignored)."
  exit 1
fi
# `set -a` exports everything the file defines; sourcing (rather than grep|cut) is what
# makes quoted values and values containing '=' survive intact.
set -a; . "$ENV_DEPLOY"; set +a

: "${VM_HOST:?VM_HOST must be set in .env.deploy}"
: "${VM_USER:?VM_USER must be set in .env.deploy}"
: "${VM_KEY:?VM_KEY must be set in .env.deploy}"
: "${VM_DIR:?VM_DIR must be set in .env.deploy}"
: "${DOMAIN:?DOMAIN must be set in .env.deploy}"
: "${API_BASE_URL:?API_BASE_URL must be set in .env.deploy}"

# Repair a locally tilde-expanded path. `VM_DIR=~/trovie` (unquoted) is expanded by OUR shell
# when this file is sourced, so it arrives as /Users/you/trovie and the remote `cd` fails with a
# confusing "No such file or directory" naming a LOCAL path. Fold our $HOME back into `~` so the
# REMOTE shell expands it instead. Same hazard for VM_KEY, but that one is used locally by ssh,
# where local expansion is exactly what we want — so it is deliberately left alone.
if [[ -n "${HOME:-}" && "$VM_DIR" == "$HOME"/* ]]; then
  warn "VM_DIR was expanded to a LOCAL path (${VM_DIR}) — quote it in .env.deploy. Correcting."
  VM_DIR="~/${VM_DIR#"$HOME"/}"
fi

IMAGE="${IMAGE_NAME:-trovie-portfolio}"
CONTAINER="${CONTAINER_NAME:-trovie-portfolio-1}"
SERVICE="${COMPOSE_SERVICE:-portfolio}"
PLATFORM="${PLATFORM:-linux/amd64}"
SSH_OPTS="-o ConnectTimeout=10 -o StrictHostKeyChecking=accept-new"

# `</dev/null` is load-bearing: ssh forwards stdin to the remote command, so without it
# any piped input to this script gets swallowed here and later `read`s see EOF.
vm() { ssh $SSH_OPTS -i "$VM_KEY" "${VM_USER}@${VM_HOST}" "$@" </dev/null; }

BUMP=""
BUILD_ONLY=false
while [[ $# -gt 0 ]]; do
  case "$1" in
    --bump)       BUMP="${2:-patch}"; shift 2 ;;
    --build-only) BUILD_ONLY=true; shift ;;
    -h|--help)    sed -n '2,15p' "$0"; exit 0 ;;
    *)            err "Unknown option: $1"; exit 1 ;;
  esac
done

# ─── Preflight ───────────────────────────────────────────
log "Checking prerequisites..."
command -v docker >/dev/null || { err "docker not installed"; exit 1; }
docker info >/dev/null 2>&1 || { err "docker daemon not running"; exit 1; }
if ! $BUILD_ONLY; then
  vm "echo ok" >/dev/null 2>&1 || { err "Cannot reach ${VM_HOST} (ssh-add ${VM_KEY}?)"; exit 1; }
  ok "VM reachable at ${VM_HOST}"
fi

# ─── Version bump (opt-in) ───────────────────────────────
if [[ -n "$BUMP" ]]; then
  current=$(node -p "require('./package.json').version")
  IFS='.' read -r major minor patch <<< "$current"
  case "$BUMP" in
    patch) patch=$((patch + 1)) ;;
    minor) minor=$((minor + 1)); patch=0 ;;
    major) major=$((major + 1)); minor=0; patch=0 ;;
    *) err "--bump expects patch|minor|major"; exit 1 ;;
  esac
  next="${major}.${minor}.${patch}"
  node -e "
    const fs = require('fs');
    const p = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    p.version = '${next}';
    fs.writeFileSync('./package.json', JSON.stringify(p, null, 2) + '\n');
  "
  ok "Version: ${current} → ${next}"
fi

# ─── Build ───────────────────────────────────────────────
# The site has NO static fallback, so `next build` must REACH the portfolio API to
# prerender `/`. Compose only injects BACKEND_INTERNAL_URL at runtime, and its
# http://backend:8000 does not resolve inside a build container — so the builder stage
# gets the PUBLIC base instead (Dockerfile scopes the ARG to that stage, leaving the
# runner on compose's fast in-network URL). An unseeded or down API therefore FAILS the
# build rather than shipping a blank portfolio. That is the intended guard.
BUILD_ARGS=(--build-arg "BACKEND_INTERNAL_URL=${API_BASE_URL}")
if [[ -n "${NEXT_PUBLIC_GA_ID:-}" ]]; then
  info "Baking NEXT_PUBLIC_GA_ID into the build"
  BUILD_ARGS+=(--build-arg "NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}")
else
  warn "NEXT_PUBLIC_GA_ID unset — analytics will be inert in this image"
fi

log "Building ${IMAGE} (${PLATFORM}), prerendering from ${API_BASE_URL}..."
docker build --platform "$PLATFORM" "${BUILD_ARGS[@]}" -t "$IMAGE" .
ok "Built ${IMAGE}"

if $BUILD_ONLY; then
  info "--build-only: stopping before upload"
  exit 0
fi

# ─── Ship ────────────────────────────────────────────────
TARBALL="$(mktemp -t portfolio-image-XXXXXX).tar.gz"
trap 'rm -f "$TARBALL"' EXIT

log "Exporting image..."
docker save "$IMAGE" | gzip > "$TARBALL"
ok "Saved ($(du -h "$TARBALL" | cut -f1))"

log "Uploading to VM..."
scp -q -i "$VM_KEY" "$TARBALL" "${VM_USER}@${VM_HOST}:/tmp/portfolio-image.tar.gz"

log "Loading image on VM..."
vm "gunzip -c /tmp/portfolio-image.tar.gz | docker load && rm -f /tmp/portfolio-image.tar.gz"
ok "Loaded ${IMAGE} on VM"

# Loading a new image orphans the tag's previous one. Left unpruned these accumulate a
# full image per deploy and have filled this VM's disk before (see trovie CLAUDE.md).
# Dangling-only — never -a, which could remove an image another container still needs.
log "Pruning images orphaned by this deploy..."
vm "docker image prune -f" >/dev/null 2>&1 || warn "Prune failed (non-fatal)"

# ─── Swap the container ──────────────────────────────────
log "Recreating ${SERVICE}..."
vm "cd ${VM_DIR} && docker compose up -d --no-deps --force-recreate ${SERVICE}"

log "Waiting for ${CONTAINER} to report healthy..."
for i in $(seq 1 30); do
  status=$(vm "docker inspect --format '{{.State.Health.Status}}' ${CONTAINER} 2>/dev/null || echo missing")
  case "$status" in
    healthy) ok "${CONTAINER} is healthy"; break ;;
    unhealthy) err "${CONTAINER} is UNHEALTHY"; vm "docker logs --tail 40 ${CONTAINER}"; exit 1 ;;
  esac
  [[ $i -eq 30 ]] && { err "Timed out waiting for health"; vm "docker logs --tail 40 ${CONTAINER}"; exit 1; }
  sleep 2
done

# nginx resolves upstreams by runtime DNS, but a recreate changes the container IP —
# reload so it re-resolves instead of holding the dead address.
vm "cd ${VM_DIR} && docker compose restart nginx" >/dev/null 2>&1 || warn "nginx restart skipped"

# ─── Verify ──────────────────────────────────────────────
log "Verifying https://${DOMAIN} ..."
code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "https://${DOMAIN}/" || echo 000)
if [[ "$code" == "200" ]]; then
  ok "https://${DOMAIN} → 200"
else
  err "https://${DOMAIN} → ${code}"
  vm "docker logs --tail 40 ${CONTAINER}"
  exit 1
fi

info "Deployed $(node -p "require('./package.json').version") to ${DOMAIN}"
