import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  Filter,
  Layers3,
  // Search,
  ShieldCheck,
  Sparkles,
  Table2,
  Upload
} from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { IconBadge } from "@/components/ui/IconBadge";
import { LiveAnalyticsPreview } from "@/components/ui/LiveAnalyticsPreview";
import { Reveal } from "@/components/ui/Reveal";
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
    title: "Generate dashboards",
    description:
      "Turn uploaded data into KPI cards, charts, and useful visual summaries.",
    icon: BarChart3,
    tone: "rose"
  },
  {
    title: "Explore rows",
    description:
      "Review filtered records in tables designed for larger datasets.",
    icon: Table2,
    tone: "lilac"
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
    title: "Upload CSV",
    description: "Drop in a dataset and let Exfolia read it safely.",
    icon: Upload,
    tone: "sky"
  },
  {
    title: "Detect schema",
    description: "Infer columns, types, examples, and dataset readiness.",
    icon: Database,
    tone: "mint"
  },
  {
    title: "Generate dashboard",
    description: "Create charts, KPI cards, and table views from the data.",
    icon: BarChart3,
    tone: "amber"
  },
  {
    title: "Explain results",
    description: "Ask AI to explain the computed patterns and next steps.",
    icon: Sparkles,
    tone: "lilac"
  }
] as const;

const trustCards = [
  {
    title: "Backend validates payloads",
    description:
      "Shared Zod contracts help keep frontend and backend request shapes aligned."
  },
  {
    title: "Database stores flexible rows",
    description:
      "JSONB row storage supports arbitrary CSV schemas while keeping metadata structured."
  },
  {
    title: "AI explains computed results",
    description:
      "Exfolia sends summaries, not raw large datasets, so insights stay grounded and cost-conscious."
  }
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
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
            <a className="transition-colors duration-150 hover:text-primary" href="#live-preview">
              Preview
            </a>
            <a className="transition-colors duration-150 hover:text-primary" href="#workflow">
              Workflow
            </a>
            <a className="transition-colors duration-150 hover:text-primary" href="#trust">
              Trust
            </a>
          </nav>

          <a
            href="#workspace"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium !text-white transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Open workspace
          </a>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-73px)] w-full max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:px-10 lg:py-20">
        <Reveal className="max-w-3xl" y={70} scale={0.95}>
          <p className="mb-5 inline-flex rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-primary">
            AI-powered dashboard generation for CSV data
          </p>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Peel back the layers of your data.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Exfolia helps you upload CSV datasets, infer their structure,
            generate dashboards, explore rows, build visual queries, and ask AI
            for grounded insight without writing SQL.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#workspace"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold !text-white transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Start exploring
              <ArrowRight size={16} strokeWidth={2.2} />
            </a>

            <a
              href="#live-preview"
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-150 hover:border-border-strong hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              See live preview
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted">
            <div className="flex -space-x-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-accent-mint-soft text-xs font-semibold text-icon-ink">
                PO
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-accent-sky-soft text-xs font-semibold text-icon-ink">
                DA
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-accent-lilac-soft text-xs font-semibold text-icon-ink">
                AI
              </span>
            </div>
            <p>Built for analysts, founders, students, and teams exploring messy CSVs.</p>
          </div>
        </Reveal>

        <WorkspacePreview />
      </section>

      <section id="features" className="border-y border-border bg-surface py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal className="mb-10 max-w-2xl">
            <p className="text-sm font-medium text-primary">What Exfolia does</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              From raw CSV to dashboard-ready insight.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              The product flow is simple: upload data, understand the structure,
              generate useful dashboards, filter what matters, and use AI for explanation.
            </p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.06} y={50}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  tone={feature.tone}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="live-preview" className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal className="mb-8 grid gap-6 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-medium text-primary">Live analytics preview</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                Show the dashboard before users even sign in.
              </h2>
            </div>
            <p className="text-sm leading-7 text-muted">
              The landing page now shows the core product promise visually: a CSV becomes
              KPI cards, charts, category breakdowns, and an AI summary.
            </p>
          </Reveal>

          <Reveal y={68} scale={0.94}>
            <LiveAnalyticsPreview />
          </Reveal>
        </div>
      </section>

      <section id="workflow" className="bg-primary py-16 text-white md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal className="grid gap-10 lg:grid-cols-[0.75fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-medium text-white/75">Workflow</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                A guided path from upload to explanation.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/75">
                Exfolia keeps the experience visual and guided so users do not need
                to understand databases, SQL, or chart configuration before they
                can start exploring their data.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {workflowSteps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.08} y={44}>
                  <article className="group rounded-3xl border border-white/15 bg-white/10 p-5 transition-transform duration-300 hover:-translate-y-1">
                    <IconBadge
                      icon={step.icon}
                      tone={step.tone}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />

                    <h3 className="mt-5 text-base font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/75">
                      {step.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="trust" className="bg-background py-16 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[0.8fr_1fr] lg:px-10">
          <Reveal>
            <div className="h-full rounded-3xl border border-border bg-surface p-6 md:p-8">
              <IconBadge icon={ShieldCheck} tone="mint" size="lg" />

              <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
                Built around controlled exploration.
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted">
                The AI layer does not become the source of truth. Exfolia computes
                summaries first, then sends compact context to the selected AI
                provider for explanation.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {trustCards.map((card, index) => (
              <Reveal
                key={card.title}
                delay={index * 0.08}
                className={index === 2 ? "md:col-span-2" : undefined}
              >
                <article className="h-full rounded-3xl border border-border bg-surface p-6 transition-transform duration-300 hover:-translate-y-1">
                  <CheckCircle2 size={22} strokeWidth={2.1} className="text-primary" />
                  <h3 className="mt-4 font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{card.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-surface py-10">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-8 md:grid-cols-[1fr_0.8fr] lg:px-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Layers3 size={20} strokeWidth={2.2} className="text-white" />
              </span>
              <span className="text-lg font-semibold tracking-tight">Exfolia</span>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
              Peel back the layers of your data with CSV upload, dashboard generation,
              visual querying, and AI-assisted explanation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-muted sm:grid-cols-3">
            <a href="#features" className="hover:text-primary">Features</a>
            <a href="#live-preview" className="hover:text-primary">Preview</a>
            <a href="#workflow" className="hover:text-primary">Workflow</a>
            <a href="#trust" className="hover:text-primary">Trust</a>
            <a href="#workspace" className="hover:text-primary">Workspace</a>
            <a href="#" className="hover:text-primary">Back to top</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
