```md
# Exfolia Architecture

## Overview

Exfolia is an AI-powered data exploration workspace. It accepts arbitrary CSV datasets, infers their schema, stores rows dynamically, allows users to build visual queries, displays results in virtualized tables and charts, and generates AI-assisted insights from computed summaries.

## High-Level Flow

```txt
CSV Upload
  ↓
Backend streaming parser
  ↓
Schema inference
  ↓
PostgreSQL storage
  ↓
Dynamic query builder
  ↓
Safe query parser
  ↓
Filtered results
  ↓
Virtualized table + charts
  ↓
AI insight summary
  ↓
Workspace persistence

## Monorepo Structure

apps/web
Frontend application.

apps/api
Backend API.

packages/shared
Shared TypeScript types and Zod schemas.

packages/ui
Reusable UI components.

database
Migrations, seeds, and sample CSV files.

docs
Technical documentation.

Storage Strategy

Exfolia supports arbitrary CSV schemas. Because every uploaded dataset can have different columns, v1 stores uploaded rows in PostgreSQL JSONB.

Main tables:

datasets
dataset_columns
dataset_rows
workspaces
ai_insights
Why JSONB?

JSONB gives flexibility for dynamic datasets. It allows Exfolia to store rows with different shapes without creating a new physical database table for every upload.

Trade-off:

Flexible and simpler for v1
Less performant than fully typed relational columns at very large scale

Future improvement:

Typed physical tables per dataset
Columnar storage
Dedicated analytics database
Query Safety

The frontend sends a query tree, not SQL.

The backend validates:

Dataset exists
Field exists in the dataset schema
Operator is allowed for the field type
Value matches expected type

Then it generates parameterized SQL.

User values are never concatenated directly into SQL.

AI Design

AI is used as an explanation layer, not the source of truth.

The backend computes summaries first, then sends compact structured context to Gemini or Groq.

This reduces cost, improves reliability, and avoids sending full raw datasets to the AI provider.