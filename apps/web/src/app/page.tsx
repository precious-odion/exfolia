import {
  ArrowRight,
  BarChart3,
  Brain,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock,
  Database,
  FileSpreadsheet,
  Filter,
  GraduationCap,
  Layers3,
  ShieldCheck,
  Sparkles,
  Table2,
  UsersRound
} from "lucide-react";
import { AvatarPhoto, HeroPeopleCards } from "@/components/ui/Avatar";
import { CountUp } from "@/components/ui/CountUp";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { IconBadge } from "@/components/ui/IconBadge";
import { LiveAnalyticsPreview } from "@/components/ui/LiveAnalyticsPreview";
import { Reveal } from "@/components/ui/Reveal";
import { SiteHeader } from "@/components/ui/SiteHeader";

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
    title: "Teams",
    description: "Share dashboard drafts and review AI summaries together before decisions.",
    icon: Building2,
    tone: "mint"
  },
  {
    title: "Students",
    description: "Explore research datasets with filters, charts, and explainable summaries.",
    icon: GraduationCap,
    tone: "lilac"
  },
] as const;

const trustCards = [
  {
    title: "Validated inputs",
    description: "Every upload and request shape is checked before it enters the workspace.",
    icon: CheckCircle2,
    bg: "bg-primary-soft",
    iconClassName: "text-primary",
    items: [
      "Validate upload payloads",
      "Protect workspace actions",
      "Keep request shapes aligned"
    ]
  },
  {
    title: "Flexible data foundation",
    description: "CSV schemas can vary while Exfolia keeps rows, columns, and metadata structured.",
    icon: Database,
    bg: "bg-accent-sky-soft",
    iconClassName: "text-primary",
    items: [
      "Support changing CSV columns",
      "Preserve dataset metadata",
      "Keep previews query-ready"
    ]
  },
  {
    title: "Grounded AI control",
    description: "AI explains computed summaries while users stay in control of what gets explored.",
    icon: Brain,
    bg: "bg-accent-amber-soft",
    iconClassName: "text-primary",
    items: [
      "Summarize computed results",
      "Send compact AI context",
      "Control what AI explains"
    ]
  }
] as const;

const explorationStats = [
  {
    value: 5000,
    label: "Analysts & Teams",
    icon: UsersRound
  },
  {
    value: 12000,
    label: "Datasets Analyzed",
    icon: BarChart3
  },
  {
    value: 8500,
    label: "Reports Generated",
    icon: FileSpreadsheet
  },
  {
    value: 2400,
    label: "Hours Saved Weekly",
    icon: Clock
  }
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto grid w-full max-w-7xl items-start gap-10 px-5 py-12 sm:px-8 md:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:py-20">
        <Reveal className="max-w-3xl" y={58} scale={0.96}>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Peel back the layers of your data.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Exfolia helps you upload CSV datasets, infer their structure, generate dashboards, explore rows, build visual queries, and ask AI for grounded insight without writing SQL.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#live-preview"
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

          <div className="mt-8 flex max-w-xl items-center gap-4 px-4 py-3">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((item) => (
                <AvatarPhoto
                  key={item}
                  src={`/people/person-${item}.jpg`}
                  alt="Person using Exfolia"
                  className="h-10 w-10"
                />
              ))}
            </div>
            <p className="text-sm leading-6 text-muted">
              Built for analysts, founders, students, and teams exploring messy CSVs.
            </p>
          </div>
        </Reveal>

        <Reveal y={58} scale={0.96} delay={0.08}>
          <HeroPeopleCards />
        </Reveal>
      </section>

      <section id="live-preview" className="bg-surface py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal className="mx-auto mb-12 max-w-5xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-sm font-medium">
              <Sparkles size={15} strokeWidth={2.2} />
              Live analytics preview
            </p>

            <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-semibold tracking-tight md:text-4xl lg:whitespace-nowrap">
              Preview the workspace your CSV becomes.
            </h2>
          </Reveal>

          <Reveal y={58} scale={0.96}>
            <LiveAnalyticsPreview />
          </Reveal>
        </div>
      </section>

      <section id="audience" className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal className="mx-auto mb-12 max-w-5xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-sm font-medium">
              <UsersRound size={15} strokeWidth={2.2} />
              Who it helps
            </p>

            <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-semibold tracking-tight md:text-4xl">
              Built for people who need answers before perfect data infrastructure.
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audienceCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.06} y={52}>
                <article className="interactive-card group h-full rounded-3xl border border-border bg-surface p-6 hover:border-border-strong">
                  <div className="flex items-center justify-between gap-4">
                    <IconBadge icon={card.icon} tone={card.tone} className="transition-transform duration-300 group-hover:scale-110" />
                    <AvatarPhoto
                      src={`/people/person-${(index % 4) + 1}.jpg`}
                      alt={`${card.title} using Exfolia`}
                      className="h-12 w-12"
                    />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{card.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      <section className="border-y border-border bg-surface py-14 md:py-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 text-center sm:px-8 lg:grid-cols-4 lg:px-10">
          {explorationStats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <Reveal key={stat.label} delay={index * 0.06} y={32}>
                <div className="flex flex-col items-center">
                  <Icon size={20} strokeWidth={2.1} className="text-primary" />

                  <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    <CountUp end={stat.value} />+
                  </p>

                  <p className="mt-2 text-sm text-muted">{stat.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="features" className="bg-primary py-16 text-white md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal className="mx-auto mb-12 max-w-5xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
              <Sparkles size={15} strokeWidth={2.2} />
              What Exfolia does
            </p>

            <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl lg:whitespace-nowrap">
              From raw CSV to dashboard-ready insight.
            </h2>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.06} y={50}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  tone={feature.tone}
                  variant="dark"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="trust" className="bg-background py-16 text-foreground md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal className="mx-auto mb-12 max-w-5xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-foreground">
              <ShieldCheck size={15} strokeWidth={2.2} />
              Trust & control
            </p>

            <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:whitespace-nowrap">
              Built around controlled exploration.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-foreground/65">
              Exfolia computes summaries first, then sends compact context to AI for explanation.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 items-stretch justify-center gap-6 lg:grid-cols-3">
            {trustCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <Reveal key={card.title} delay={index * 0.08} y={50}>
                  <article className={`relative h-full overflow-hidden rounded-2xl ${card.bg} px-6 pb-6 pt-20 text-foreground transition-all duration-200 hover:shadow-lg`}>
                    <Icon
                      size={70}
                      strokeWidth={2}
                      className={`absolute right-[-0.75rem] top-[-0.45rem] ${card.iconClassName}`}
                    />

                    <h3 className="text-2xl font-semibold tracking-tight text-foreground">{card.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-foreground">{card.description}</p>

                    <div className="mt-6 space-y-3">
                      {card.items.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <CheckCircle2 size={16} strokeWidth={2.1} className="shrink-0 text-primary" />
                          <p className="text-sm text-foreground">{item}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="bg-primary py-12 text-white">
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
            <a href="#live-preview" className="hover:text-white">Preview</a>
            <a href="#audience" className="hover:text-white">Audience</a>
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#trust" className="hover:text-white">Trust</a>
            <a href="#" className="hover:text-white">Back to top</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
