import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  Filter,
  Layers3,
  Search,
  ShieldCheck,
  Table2,
  Upload
} from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { IconBadge } from "@/components/ui/IconBadge";
import { WorkspacePreview } from "@/components/ui/WorkspacePreview";

const featureCards = [
  {
    title: "Upload any CSV",
    description:
      "Bring in sales, customer, survey, product, student, or operations data.",
    icon: FileSpreadsheet,
    tone: "sky"
  },
  {
    title: "Infer the structure",
    description:
      "Detect column names, data types, sample values, and dataset shape.",
    icon: Database,
    tone: "mint"
  },
  {
    title: "Build visual queries",
    description:
      "Create nested filters without writing SQL or touching the database.",
    icon: Filter,
    tone: "amber"
  },
  {
    title: "Explore rows",
    description:
      "Review filtered records in a table designed for larger datasets.",
    icon: Table2,
    tone: "lilac"
  },
  {
    title: "Generate charts",
    description:
      "Turn filtered data into simple charts that help explain what changed.",
    icon: BarChart3,
    tone: "rose"
  },
  {
    title: "Ask AI for insight",
    description:
      "Use Gemini or Groq to explain computed summaries and trends.",
    icon: Brain,
    tone: "primary"
  }
] as const;

const workflowSteps = [
  {
    title: "Upload",
    description: "Drop in a CSV file and let Exfolia read it safely.",
    icon: Upload,
    tone: "sky"
  },
  {
    title: "Prepare",
    description: "Infer columns, detect types, and store rows as JSONB.",
    icon: Database,
    tone: "mint"
  },
  {
    title: "Explore",
    description: "Filter, chart, and ask AI questions over the dataset.",
    icon: Search,
    tone: "amber"
  }
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-border pb-5">
          <a href="#" className="flex items-center gap-3" aria-label="Exfolia home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Layers3 size={20} strokeWidth={2.2} className="text-white" />
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
            <a className="transition-colors duration-150 hover:text-primary" href="#security">
              Trust
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
          <section className="subtle-fade-up max-w-3xl">
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Start exploring
                <ArrowRight size={16} strokeWidth={2.2} />
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
      </section>

      <section id="features" className="border-y border-border bg-surface py-16">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-medium text-primary">What Exfolia does</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              From raw CSV to explainable insight.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              The product flow is simple: upload data, understand the structure,
              filter what matters, visualize it, and use AI for explanation.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                tone={feature.tone}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="bg-primary py-16 text-white">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-medium text-white/75">Workflow</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                A clear path from upload to insight.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/75">
                Exfolia keeps the experience guided so users do not need to
                understand databases, SQL, or chart configuration before they
                can start exploring their data.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {workflowSteps.map((step) => (
                <article
                  key={step.title}
                  className="rounded-3xl border border-white/15 bg-white/8 p-5"
                >
                  <IconBadge icon={step.icon} tone={step.tone} />

                  <h3 className="mt-5 text-base font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="security" className="bg-background py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[0.8fr_1fr] lg:px-10">
          <div className="rounded-3xl border border-border bg-surface p-6">
            <IconBadge icon={ShieldCheck} tone="mint" size="lg" />

            <h2 className="mt-6 text-3xl font-semibold tracking-tight">
              Built around controlled exploration.
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              The AI layer does not become the source of truth. Exfolia computes
              summaries first, then sends compact context to the selected AI
              provider for explanation.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-3xl border border-border bg-surface p-6">
              <CheckCircle2 size={22} strokeWidth={2.1} className="text-primary" />
              <h3 className="mt-4 font-semibold">Backend validates payloads</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Shared Zod contracts help keep frontend and backend request
                shapes aligned.
              </p>
            </article>

            <article className="rounded-3xl border border-border bg-surface p-6">
              <CheckCircle2 size={22} strokeWidth={2.1} className="text-primary" />
              <h3 className="mt-4 font-semibold">Database stores flexible rows</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                JSONB row storage supports arbitrary CSV schemas while keeping
                metadata structured.
              </p>
            </article>

            <article className="rounded-3xl border border-border bg-surface p-6 md:col-span-2">
              <CheckCircle2 size={22} strokeWidth={2.1} className="text-primary" />
              <h3 className="mt-4 font-semibold">AI explains computed results</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Exfolia sends summaries, not raw large datasets, to Gemini or
                Groq so insights stay grounded and cost-conscious.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}