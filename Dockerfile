# syntax=docker/dockerfile:1.7
# Multi-stage production Dockerfile for ResumeIQ Enterprise (frontend).
# Built for Azure Container Registry → AKS deployment.

# ---- deps ----
FROM oven/bun:1.1-alpine AS deps
WORKDIR /app
COPY package.json bun.lockb* bunfig.toml ./
RUN bun install --frozen-lockfile || bun install

# ---- build ----
FROM oven/bun:1.1-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG APP_VERSION=dev
ENV APP_VERSION=${APP_VERSION}
RUN bun run build

# ---- runtime ----
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S app && adduser -S app -G app
COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/healthz || exit 1
CMD ["node", ".output/server/index.mjs"]
