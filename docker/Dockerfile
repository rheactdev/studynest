FROM node:24-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN corepack prepare pnpm@10.33.2 --activate

WORKDIR /app


FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile


FROM deps AS builder

COPY . .
RUN mkdir -p ./courses ./data
RUN pnpm exec next build
RUN pnpm prune --prod


FROM node:24-bookworm-slim AS runner

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV COURSES_DIR=/app/courses
ENV DATA_DIR=/app/data
ENV DATABASE_PATH=/app/data/course-player.sqlite

WORKDIR /app

RUN mkdir -p /app/data /app/courses

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

VOLUME ["/app/data"]

EXPOSE 3000

CMD ["./node_modules/.bin/next", "start"]