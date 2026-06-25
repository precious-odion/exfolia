# Exfolia

Exfolia is an AI-powered data exploration workspace that helps users upload CSV datasets, automatically infer their structure, build visual queries, generate dynamic dashboards, and receive AI-assisted insights without writing SQL.

## Inspiration

Exfolia is inspired by modern AI data-analysis tools like InsightsFlow AI, but it is built as an original engineering project with its own brand, architecture, interface, and implementation.

The goal is not to copy InsightsFlow directly. The goal is to build a highly engineered version of an upload-to-insight analytics platform.

## Core Product Idea

Exfolia helps users peel back the layers of their data.

A user should be able to:

1. Upload a CSV file.
2. Let Exfolia infer the dataset structure.
3. Preview the detected columns and types.
4. Build visual filters without writing SQL.
5. Execute the query safely through the backend.
6. View results in a virtualized table.
7. Generate dynamic charts.
8. Ask AI to explain the current dataset or dashboard.
9. Save and reload their workspace.

## Core Features

- Arbitrary CSV upload
- Streaming backend ingestion
- Dynamic schema inference
- Visual recursive query builder
- Safe backend query execution
- Server-side pagination
- Virtualized results table
- Dynamic chart suggestions
- AI-assisted insight generation with Gemini or Groq
- Workspace persistence
- Dark/light mode
- CI/CD from the beginning
- Unit, integration, and E2E testing

## Project Rules

- Exfolia accepts different kinds of CSV datasets, not only demographic data.
- All work must happen through branches and pull requests.
- Do not push directly to `main`.
- CI checks must run on pull requests.
- Result tables must use virtualization.
- UI must use solid colors only.
- No gradients.
- No heavy box shadows.
- Use motion only when it improves usability, clarity, or feedback.
- No unnecessary animations.

## Brand

Product name: Exfolia

Tagline:

```txt
Peel back the layers of your data.

CI smoke test completed after workflow bootstrap.