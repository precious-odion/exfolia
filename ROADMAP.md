# Exfolia Roadmap

## Stage 0 — Product and Engineering Rules

- Define product identity
- Lock design rules
- Lock PR workflow
- Confirm CI/CD from the beginning
- Confirm arbitrary CSV support
- Confirm AI provider direction

## Stage 1 — Project Foundation

- Create clean repo
- Create monorepo structure
- Add root documentation
- Add pnpm workspace
- Add project rules

## Stage 2 — CI/CD

- Add GitHub Actions
- Run lint, typecheck, tests, and build on PRs
- Add branch protection rules

## Stage 3 — Docker and PostgreSQL

- Add Docker Compose
- Run local PostgreSQL
- Add database environment variables

## Stage 4 — Backend Foundation

- Add Fastify API
- Add health endpoint
- Add backend testing setup

## Stage 5 — Shared Contracts

- Add shared TypeScript types
- Add Zod schemas
- Share contracts between frontend and backend

## Stage 6 — Database Schema

- Add migrations
- Create datasets, dataset_columns, dataset_rows, workspaces, and ai_insights

## Stage 7 — Landing Page

- Build InsightsFlow-inspired landing page
- Use Exfolia branding
- Solid colors only
- Minimal purposeful motion

## Stage 8 — Workspace Shell

- Add dashboard layout
- Add theme system
- Persist theme

## Stage 9 — CSV Upload

- Add upload UI
- Add streaming backend ingestion
- Add upload summary

## Stage 10 — Schema Inference

- Infer text, number, date, boolean, and category columns

## Stage 11 — Query Builder

- Add recursive visual query builder
- Add dynamic fields and operators
- Add live preview

## Stage 12 — Query Engine

- Convert query tree to safe parameterized SQL
- Add query endpoint
- Add pagination and sorting

## Stage 13 — Virtualized Results Table

- Use TanStack Table
- Use TanStack Virtual
- Add dynamic columns

## Stage 14 — Charts

- Add chart suggestion engine
- Add dashboard charts

## Stage 15 — Workspace Persistence

- Save state to localStorage
- Save/load workspaces from backend

## Stage 16 — AI Insights

- Add Gemini/Groq integration
- Generate insights from computed summaries

## Stage 17 — Testing, Polish, Deployment

- Add unit tests
- Add integration tests
- Add E2E tests
- Improve accessibility
- Deploy frontend, backend, and database