# Contributing to Exfolia

## Branch Workflow

Do not push directly to `main`.

All work must happen through branches and pull requests.

## Branch Naming

Use clear branch names:

```txt
chore/project-foundation
chore/ci-setup
feat/landing-page
feat/csv-upload
feat/schema-inference
feat/query-builder
feat/virtualized-results-table
feat/ai-insights
test/e2e-product-flow
docs/project-documentation

```


This will remind you of the project standards every time you open a PR.

## Step 8: Update `CONTRIBUTING.md`

Add this section to `CONTRIBUTING.md`:

```md
## CI/CD

Every pull request into `main` must pass GitHub Actions checks.

Required checks include:

- lint
- formatting check
- typecheck
- unit tests
- integration tests
- build
- E2E tests when available

Do not merge a PR if CI is failing.

## Main Branch Protection

The `main` branch should be protected.

Recommended GitHub settings:

- Require a pull request before merging
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Do not allow force pushes
- Do not allow deletion of the branch