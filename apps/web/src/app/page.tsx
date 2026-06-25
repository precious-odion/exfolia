import {
  BarChart3,
  Brain,
  Database,
  FileSpreadsheet,
  Filter,
  Layers3,
  Table2
} from "lucide-react";

const featureCards = [
  {
    title: "Upload CSV data",
    description:
      "Bring in sales, survey, customer, product, student, or operational data.",
    icon: FileSpreadsheet
  },
  {
    title: "Infer the structure",
    description:
      "Exfolia detects columns and prepares the dataset for filtering and charts.",
    icon: Database
  },
  {
    title: "Build visual queries",
    description:
      "Create nested filters without writing SQL or touching the database directly.",
    icon: Filter
  },
  {
    title: "Explore results",
    description:
      "Review filtered rows in a virtualized table designed for larger datasets.",
    icon: Table2
  },
  {
    title: "Generate charts",
    description:
      "Turn query results into useful dashboard visuals with clean chart suggestions.",
    icon: BarChart3
  },
  {
    title: "Ask AI for insight",
    description:
      "Use Gemini or Groq to explain computed summaries, trends, and next steps.",
    icon: Brain
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-border pb-5">
          <a href="#" className="flex items-center gap-3" aria-label="Exfolia home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <Layers3 size={20} strokeWidth={2.2} />
            </span>
            <span className="text-lg font-semibold tracking-tight">Exfolia</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            <a className="transition hover:text-primary" href="#features">
              Features
            </a>
            <a className="transition hover:text-primary" href="#workflow">
              Workflow
            </a>
            <a className="transition hover:text-primary" href="#workspace">
              Workspace
            </a>
          </nav>

          <a
            href="#workspace"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Open workspace
          </a>
        </header>

        <div className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1fr_0.9fr] lg:py-20">
          <section className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-primary">
              AI-powered data exploration workspace
            </p>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Peel back the layers of your data.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              Exfolia helps you upload CSV datasets, infer their structure,
              build visual queries, explore results, generate charts, and ask AI
              for grounded insights without writing SQL.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#workspace"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Start exploring
              </a>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition hover:border-border-strong hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                See how it works
              </a>
            </div>
          </section>

          <section
            id="workspace"
            className="rounded-[1.5rem] border border-border bg-surface p-4"
            aria-label="Workspace preview"
          >
            <div className="rounded-[1.1rem] border border-border bg-background p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                    Workspace
                  </p>
                  <h2 className="mt-1 text-lg font-semibold">Sales overview.csv</h2>
                </div>
                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary-dark">
                  Ready
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-surface p-4">
                  <p className="text-xs text-muted">Rows</p>
                  <p className="mt-2 text-2xl font-semibold">48,210</p>
                </div>
                <div className="rounded-xl border border-border bg-surface p-4">
                  <p className="text-xs text-muted">Columns</p>
                  <p className="mt-2 text-2xl font-semibold">12</p>
                </div>
                <div className="rounded-xl border border-border bg-surface p-4">
                  <p className="text-xs text-muted">Status</p>
                  <p className="mt-2 text-2xl font-semibold">Clean</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-border bg-surface p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                  <Filter size={16} />
                  Visual query
                </div>
                <div className="space-y-2 text-sm text-muted">
                  <p className="rounded-lg border border-border bg-background px-3 py-2">
                    revenue greater than 100000
                  </p>
                  <p className="rounded-lg border border-border bg-background px-3 py-2">
                    region equals Lagos or Abuja
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="h-36 rounded-xl border border-border bg-surface p-4">
                  <div className="flex h-full items-end gap-2">
                    <span className="h-10 flex-1 rounded-t-md bg-primary-soft" />
                    <span className="h-20 flex-1 rounded-t-md bg-primary" />
                    <span className="h-16 flex-1 rounded-t-md bg-primary-light" />
                    <span className="h-28 flex-1 rounded-t-md bg-primary-dark" />
                  </div>
                </div>

                <div className="h-36 rounded-xl border border-border bg-surface p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                    <Brain size={16} />
                    AI insight
                  </div>
                  <p className="text-sm leading-6 text-muted">
                    Lagos is currently the strongest segment in this filtered
                    view, with higher-value transactions concentrated in fewer
                    records.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section id="features" className="border-t border-border py-12">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-medium text-primary">How Exfolia works</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              From raw CSV to explainable insight.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-border bg-surface p-5"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon size={19} />
                  </div>
                  <h3 className="text-base font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}