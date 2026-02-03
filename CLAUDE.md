# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Budgetly is a personal finance app (budgeting, transaction accounting, bank sync, analytics). It's a Bun monorepo with NPM workspaces. Currently in early development (0.0.1-beta.1).

## Monorepo Structure

- `packages/web` - Full-stack React Router v7 app (SSR-enabled) with MikroORM, Redis sessions, OAuth2 auth
- `packages/temporal` - Temporal workflow engine configuration and dynamic config
- Future: `packages/mobile` (Tauri or React Native), API (Bun/Elysia), Kafka workers

## Commands

All commands use Bun. Run from the repo root unless noted.

```bash
# Install dependencies
bun install

# Dev server (from packages/web)
cd packages/web && bun run dev

# Build web (generates MikroORM cache, then React Router build)
bun run --filter "@budgetly/web" build

# Lint (Biome - root level checks all packages)
bunx --bun biome check .
bunx --bun biome check --write .          # auto-fix

# Lint (web package only)
cd packages/web && bun run lint
cd packages/web && bun run lint:fix

# Type check (generates React Router types first)
bun run --filter "@budgetly/web" types:check

# Tests (Bun test runner, from packages/web)
cd packages/web && bun test
cd packages/web && bun test app/lib/util/cn.test.ts   # single test file
cd packages/web && bun test --coverage

# Database (dbmate, from packages/web, requires DATABASE_URL)
cd packages/web && bun run db:migrate
cd packages/web && bun run db:rollback
cd packages/web && bun run db:new <migration-name>
cd packages/web && bun run db:status

# Infrastructure
docker compose up -d                      # PostgreSQL, Redis, OpenSearch, Temporal
```

## Architecture

### Web App (`packages/web/app/`)

**Routing:** File-system routes via `@react-router/fs-routes` in `app/routes/`. Route files use `__.` prefix convention. Default exports are allowed in route files (biome override).

**Path alias:** `~/*` maps to `./app/*` (configured in tsconfig paths).

**Database:** PostgreSQL via MikroORM with decorator-based entities in `app/lib/mikro-orm/entities/`. All entities extend `BaseEntity` (nanoid primary keys, `created_at`/`updated_at` timestamps). Uses `forceUndefined: true` and `forceUtcTimezone: true`. In development, ORM is cached on `global.__orm` to survive hot reload. Production requires pre-generated metadata cache (`bun run build:mikro-orm:cache`).

**Migrations:** Raw SQL via dbmate in `db/migrations/`. Files follow `YYYYMMDDHHMMSS_description.sql` naming.

**Sessions:** Database-backed via MikroORM `Session` entity + encrypted cookies (`@hapi/iron`). Cookie secrets are read from numbered env vars `SESSION_SECRET_1`, `SESSION_SECRET_2`, etc. Session storage wraps React Router's `createSessionStorage`.

**Auth:** `remix-auth` with OAuth2 strategies (Atlassian, GitLab via `arctic`). Strategies defined in `app/lib/auth/strategies/`. The `ProviderAccount` union type (`AtlassianAccount | GitLabAccount`) is the authenticator's return type.

**Request context:** `withRequestContext` HOF in `app/lib/mikro-orm/with-request-context.ts` wraps async functions with MikroORM's `RequestContext` for per-request entity manager isolation.

**Redis:** Singleton client in `app/lib/redis/client.ts`, cached on `global.__redis` in development.

**React Query:** Client configured in `app/lib/query/client.ts`, provided at root via `QueryClientProvider`.

**UI:** shadcn/ui components live in `app/components/shadcn/ui/`. Custom components go in `app/components/`.

### Infrastructure (`compose.yml`)

Services: PostgreSQL 18.1, Redis 8.0.2, OpenSearch 2.19.4 + Dashboards, Temporal 1.29.2 (auto-setup) + Admin Tools + UI.

Temporal uses PostgreSQL for persistence and OpenSearch for visibility. Temporal UI is at `localhost:9002`.

### Docker Build

Multi-stage Dockerfile targets: `base` -> `deps-production` / `deps-development` -> `builder` -> `web`. The `web` target runs as non-root `bun` user. Entrypoint script runs dbmate migrations before starting the app.

## Code Conventions

**Formatting (Biome):** Tabs, single quotes, no semicolons, no trailing commas, 100-char line width. Arrow parens: as needed. JSX quotes: single.

**Linting rules to know:**
- `noDefaultExport: error` globally, but **off** for route files, config files, and storybook
- `noProcessEnv: error` - access env only in dedicated config/lib files, suppress with `biome-ignore-all` comment
- `noCommonJs: error` - ESM only
- `useImportExtensions: error` - always include `.ts`/`.tsx` extensions in imports
- `useBlockStatements: error` - always use braces
- Max cognitive complexity: 15

**File naming:** kebab-case only for all files (`loading-spinner.tsx`, not `LoadingSpinner.tsx`).

**Imports:** Group in order with blank lines between: (1) type imports, (2) Node/Bun built-ins, (3) external modules, (4) local imports. Use `import type { ... }` syntax, never `import { type ... }`. Alphabetize within groups.

**Types:** Prefer `undefined` over `null`. Use explicit predicates over `Boolean()` or `!!value`.

**Testing:** Bun test runner with happy-dom. Test setup preloads `@happy-dom/global-registrator` and `@testing-library/jest-dom`. Place test files adjacent to source with `.test.ts`/`.test.tsx` suffix. Tests run from `packages/web/app/` root.

## Environment Variables

Required for `packages/web`:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `SESSION_SECRET_1` (and optionally `_2`, `_3`...) - Cookie encryption secrets
- `SESSION_SECURE` - Set to `true` for HTTPS cookie flag
- `OAUTH_ATLASSIAN_CLIENT_ID`, `OAUTH_ATLASSIAN_CLIENT_SECRET`, `OAUTH_ATLASSIAN_CALLBACK_URL`
- `OAUTH_GITLAB_CLIENT_ID`, `OAUTH_GITLAB_CLIENT_SECRET`, `OAUTH_GITLAB_CALLBACK_URL`

For Docker Compose (root `.env`):
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- `REDIS_PASSWORD`
- `OPENSEARCH_ADMIN_PASSWORD`

## CI/CD

GitHub Actions (`.github/workflows/build.yml`): install-deps -> lint-root + lint-web + type-check-web + test-web (parallel) -> scan-web (Trivy) + push-web (Docker multi-platform). PRs also get bundle-size analysis and license compliance checks.

Deployment (`.github/workflows/deploy.yml`): SSH-based deployment to staging/production at `/srv/budgetly`.
