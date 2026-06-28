import {
  ArrowRight,
  BarChart3,
  Brain,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  Filter,
  GraduationCap,
  Layers3,
  ShieldCheck,
  Sparkles,
  Table2,
  Upload,
  UsersRound
} from "lucide-react";
import { AvatarFace, AvatarStack } from "@/components/ui/Avatar";
import { CountUp } from "@/components/ui/CountUp";
import { DashboardGenerationPreview } from "@/components/ui/DashboardGenerationPreview";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { IconBadge } from "@/components/ui/IconBadge";
import { LiveAnalyticsPreview } from "@/components/ui/LiveAnalyticsPreview";
import { Reveal } from "@/components/ui/Reveal";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { WorkspacePreview } from "@/components/ui/WorkspacePreview";

const featureCards = [
  {
    title: "Upload any CSV",
    description: "Bring in sales, customer, survey, product, student, or operations data.",
    icon: FileSpreadsheet,
    tone: "sky"
  },
  {
    title: "Infer the structure",
    description: "Detect column names, data types, sample values, and dataset shape.",
    icon: Database,
    tone: "mint"
  },
  {
    title: "Build visual queries",
    description: "Create nested filters without writing SQL or touching the database.",
    icon: Filter,
    tone: "amber"
  },
  {
    title: "Generate dashboards",
    description: "Turn uploaded data into KPI cards, charts, and useful visual summaries.",
    icon: BarChart3,
    tone: "rose"
  },
  {
    title: "Explore rows",
    description: "Review filtered records in tables designed for larger datasets.",
    icon: Table2,
    tone: "lilac"
  },
  {
    title: "Ask AI for insight",
    description: "Use Gemini or Groq to explain computed summaries and trends.",
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

const audienceCards = [
  {
    title: "Analysts",
    description: "Move from raw exports to visual answers without repetitive spreadsheet work.",
    icon: UsersRound,
    tone: "sky"
  },
  {
    title: "Founders",
    description: "Understand revenue, customers, and operations without waiting for a data team.",
    icon: BriefcaseBusiness,
    tone: "amber"
  },
  {
    title: "Students",
    description: "Explore research datasets with filters, charts, and explainable summaries.",
    icon: GraduationCap,
    tone: "lilac"
  },
  {
    title: "Teams",
    description: "Share dashboard drafts and review AI summaries together before decisions.",
    icon: Building2,
    tone: "mint"
  }
] as const;

const trustCards = [
  {
    title: "Backend validates payloads",
    description: "Shared Zod contracts help keep frontend and backend request shapes aligned."
  },
  {
    title: "Database stores flexible rows",
    description: "JSONB row storage supports arbitrary CSV schemas while keeping metadata structured."
  },
  {
    title: "AI explains computed results",
    description: "Exfolia sends summaries, not raw large datasets, so insights stay grounded and cost-conscious."
  }
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto grid w-full max-w-7xl items-start gap-10 px-5 py-12 sm:px-8 md:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-16">
        <Reveal className="max-w-3xl" y={58} scale={0.96}>
          <p className="mb-5 inline-flex rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-primary">
            AI-powered dashboard generation for CSV data
          </p>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Peel back the layers of your data.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Exfolia helps you upload CSV datasets, infer their structure, generate dashboards, explore rows, build visual queries, and ask AI for grounded insight without writing SQL.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#workspace"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold !text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Start exploring
              <ArrowRight size={16} strokeWidth={2.2} />
            </a>

            <a
              href="#live-preview"
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:scale-[1.03] hover:border-border-strong hover:text-primary active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              See live preview
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
            <AvatarStack />
            <p className="text-sm leading-6 text-muted">
              Built for analysts, founders, students, and teams exploring messy CSVs.
            </p>
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
              The product flow is simple: upload data, understand the structure, generate dashboards, filter what matters, and use AI for explanation.
            </p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.06} y={50}>
                <FeatureCard title={feature.title} description={feature.description} icon={feature.icon} tone={feature.tone} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="generation" className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal className="mb-8 grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-medium text-primary">Dashboard generation</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                Make the product feel like it is already running.
              </h2>
            </div>
            <p className="text-sm leading-7 text-muted">
              A visitor should see the upload, schema detection, dashboard draft, and query preview before they ever enter the workspace.
            </p>
          </Reveal>

          <Reveal y={58} scale={0.96}>
            <DashboardGenerationPreview />
          </Reveal>
        </div>
      </section>

      <section id="live-preview" className="border-y border-border bg-surface py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal className="mb-8 grid gap-6 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-medium text-primary">Live analytics preview</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                Show charts, KPI cards, and AI insight before sign-in.
              </h2>
            </div>
            <p className="text-sm leading-7 text-muted">
              The preview is interactive: visitors can switch between revenue, segments, and forecast views while seeing how generated analytics would look.
            </p>
          </Reveal>

          <Reveal y={58} scale={0.96}>
            <LiveAnalyticsPreview />
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal className="rounded-[2rem] border border-border bg-surface p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-primary">Active exploration</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                  Numbers that move when the section appears.
                </h2>
              </div>
              <div className="rounded-3xl border border-border bg-background p-5 text-center">
                <p className="text-4xl font-semibold text-foreground"><CountUp end={10000} />+</p>
                <p className="mt-2 text-sm text-muted">Rows previewed</p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-5 text-center">
                <p className="text-4xl font-semibold text-foreground"><CountUp end={2.4} decimals={1} />K+</p>
                <p className="mt-2 text-sm text-muted">Charts generated</p>
              </div>
            </div>
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
                Exfolia keeps the experience visual and guided so users do not need to understand databases, SQL, or chart configuration before they can start exploring their data.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {workflowSteps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.08} y={44}>
                  <article className="interactive-card group rounded-3xl border border-white/15 bg-white/10 p-5 hover:bg-white/15">
                    <IconBadge icon={step.icon} tone={step.tone} className="transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="mt-5 text-base font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/75">{step.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="audience" className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal className="mb-8 max-w-2xl">
            <p className="text-sm font-medium text-primary">Who it helps</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Built for people who need answers before perfect data infrastructure.
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audienceCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.06} y={52}>
                <article className="interactive-card group h-full rounded-3xl border border-border bg-surface p-6 hover:border-border-strong">
                  <div className="flex items-center justify-between gap-4">
                    <IconBadge icon={card.icon} tone={card.tone} className="transition-transform duration-300 group-hover:scale-110" />
                    <AvatarFace tone={card.tone} hair={index % 2 === 0 ? "hood" : "short"} glasses={index % 2 === 0} className="h-12 w-12" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{card.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="trust" className="border-t border-border bg-background py-16 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[0.8fr_1fr] lg:px-10">
          <Reveal>
            <div className="h-full rounded-3xl border border-border bg-surface p-6 md:p-8">
              <IconBadge icon={ShieldCheck} tone="mint" size="lg" />
              <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
                Built around controlled exploration.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                The AI layer does not become the source of truth. Exfolia computes summaries first, then sends compact context to the selected AI provider for explanation.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {trustCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.08} className={index === 2 ? "md:col-span-2" : undefined}>
                <article className="interactive-card h-full rounded-3xl border border-border bg-surface p-6 hover:border-border-strong">
                  <CheckCircle2 size={22} strokeWidth={2.1} className="text-primary" />
                  <h3 className="mt-4 font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{card.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#071011] py-12 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-8 md:grid-cols-[1fr_0.8fr] lg:px-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Layers3 size={20} strokeWidth={2.2} className="text-white" />
              </span>
              <span className="text-lg font-semibold tracking-tight">Exfolia</span>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/65">
              Peel back the layers of your data with CSV upload, dashboard generation, visual querying, and AI-assisted explanation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-white/65 sm:grid-cols-3">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#generation" className="hover:text-white">Generation</a>
            <a href="#live-preview" className="hover:text-white">Preview</a>
            <a href="#workflow" className="hover:text-white">Workflow</a>
            <a href="#trust" className="hover:text-white">Trust</a>
            <a href="#" className="hover:text-white">Back to top</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
