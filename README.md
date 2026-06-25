# Exfolia

Exfolia is an AI-powered data exploration workspace that helps users upload CSV datasets, automatically infer their structure, build visual queries, generate dynamic dashboards, and receive AI-assisted insights without writing SQL.

## Inspiration

Exfolia is inspired by modern AI data-analysis tools like InsightsFlow AI, but it is built as an original engineering project with its own brand, architecture, and implementation.

## Core Features

- CSV upload and streaming ingestion
- Dynamic schema inference
- Visual recursive query builder
- Safe backend query execution
- Virtualized results table
- Dynamic chart suggestions
- AI-assisted insight generation
- Workspace persistence
- Dark/light mode
- CI/CD with GitHub Actions
- Unit, integration, and E2E testing

## Project Rules

- Exfolia accepts arbitrary CSV datasets, not only demographic data.
- All work must happen through branches and pull requests.
- No direct pushes to `main`.
- CI checks must run on pull requests.

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Zustand
- TanStack Table
- TanStack Virtual
- Recharts
- Motion/Framer Motion where needed
- React Testing Library
- Playwright

### Backend

- Node.js
- Fastify
- TypeScript
- PostgreSQL
- Knex
- Zod
- Vitest
- Supertest

### AI

- Gemini or Groq

### Infrastructure

- Docker
- GitHub Actions
- Vercel / Render / Neon or Supabase later

## Status

Project foundation in progress.

## Development Workflow

Exfolia uses a PR-based workflow.

```bash
git checkout main
git pull origin main
git checkout -b feat/example-feature

Before pushing a branch, run:

pnpm lint
pnpm format:check
pnpm typecheck
pnpm test:unit
pnpm test:integration
pnpm build

```

Push your branch and open a pull request.

GitHub Actions will run automated checks on every PR.

CI/CD

CI is configured with GitHub Actions.

Current checks:

lint
formatting
typecheck
unit tests
integration tests
build
E2E placeholder