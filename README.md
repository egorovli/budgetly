# Budgetly

Personal finance app for budgeting, transaction tracking, bank sync, and analytics.

## Tech Stack

- **Runtime:** Bun
- **Web:** React Router v7 (SSR), MikroORM, Redis sessions, OAuth2
- **Infrastructure:** PostgreSQL, Redis, OpenSearch, Temporal
- **Monorepo:** NPM workspaces

## Getting Started

```bash
bun install
docker compose up -d
cd packages/web && bun run dev
```

## License

[MIT](LICENSE)
