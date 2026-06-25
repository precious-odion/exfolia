import {
  BarChart3,
  Brain,
  Database,
  FileSpreadsheet,
  Filter,
  Layers3,
  Table2
} from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { WorkspacePreview } from "@/components/ui/WorkspacePreview";

const featureCards = [
  {
    title: "Upload CSV data",
    description:
      "Bring in sales, survey, customer, product, student, or operational data.",
    icon: FileSpreadsheet,
    accent: "blue"
  },
  {
    title: "Infer the structure",
    description:
      "Exfolia detects columns and prepares the dataset for filtering and charts.",
    icon: Database,
    accent: "primary"
  },
  {
    title: "Build visual queries",
    description:
      "Create nested filters without writing SQL or touching the database directly.",
    icon: Filter,
    accent: "amber"
  },
  {
    title: "Explore results",
    description:
      "Review filtered rows in a virtualized table designed for larger datasets.",
    icon: Table2,
    accent: "purple"
  },
  {
    title: "Generate charts",
    description:
      "Turn query results into useful dashboard visuals with clean chart suggestions.",
    icon: BarChart3,
    accent: "rose"
  },
  {
    title: "Ask AI for insight",
    description:
      "Use Gemini or Groq to explain computed summaries, trends, and next steps.",
    icon: Brain,
    accent: "primary"
  }
] as const;

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
            <a className="transition-colors duration-150 hover:text-primary" href="#features">
              Features
            </a>
            <a className="transition-colors duration-150 hover:text-primary" href="#workflow">
              Workflow
            </a>
            <a className="transition-colors duration-150 hover:text-primary" href="#workspace">
              Workspace
            </a>
          </nav>

          <a
            href="#workspace"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Start exploring
              </a>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-150 hover:border-border-strong hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                See how it works
              </a>
            </div>
          </section>

          <WorkspacePreview />
        </div>

        <section id="features" className="border-t border-border py-12">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-medium text-primary">How Exfolia works</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              From raw CSV to explainable insight.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                accent={feature.accent}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}