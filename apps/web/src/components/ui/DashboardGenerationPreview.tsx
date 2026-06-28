import {
    ArrowRight,
    BarChart3,
    Database,
    FileSpreadsheet,
    Filter,
    Sparkles
} from "lucide-react";
import { CountUp } from "./CountUp";
import { IconBadge } from "./IconBadge";

const pipelineSteps = [
    {
        title: "Upload CSV",
        description: "Drop in a spreadsheet or exported report.",
        icon: FileSpreadsheet,
        tone: "sky"
    },
    {
        title: "Detect schema",
        description: "Columns, types, sample values, and quality are inferred.",
        icon: Database,
        tone: "mint"
    },
    {
        title: "Generate dashboard",
        description: "KPI cards, charts, tables, and AI context are prepared.",
        icon: BarChart3,
        tone: "amber"
    }
] as const;

const widgetCards = [
    { title: "Revenue trend", value: "+24%", width: "w-24", tone: "bg-primary-soft" },
    { title: "Top market", value: "United States", width: "w-32", tone: "bg-accent-sky-soft" },
    { title: "Clean rows", value: "96%", width: "w-28", tone: "bg-accent-mint-soft" },
    { title: "Suggested views", value: "4", width: "w-14", tone: "bg-accent-lilac-soft" }
];

const bars = [
    { height: "h-10", color: "bg-accent-sky-soft" },
    { height: "h-16", color: "bg-primary-soft" },
    { height: "h-24", color: "bg-accent-amber-soft" },
    { height: "h-14", color: "bg-accent-lilac-soft" },
    { height: "h-20", color: "bg-accent-mint-soft" }
];

export function DashboardGenerationPreview() {
    return (
        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
            <article className="rounded-[2rem] border border-border bg-surface p-5 md:p-6">
                <p className="text-sm font-medium text-primary">Dashboard generation</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    Upload a CSV and watch a dashboard draft take shape.
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                    This preview shows the product flow visually: data comes in, structure is detected, and dashboard views are prepared.
                </p>

                <div className="mt-6 space-y-3">
                    {pipelineSteps.map((step, index) => (
                        <div key={step.title} className="interactive-card group flex items-center gap-3 rounded-3xl border border-border bg-background p-3 hover:border-border-strong">
                            <IconBadge icon={step.icon} tone={step.tone} />
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-foreground">{step.title}</p>
                                <p className="text-xs leading-5 text-muted">{step.description}</p>
                            </div>
                            {index < pipelineSteps.length - 1 ? (
                                <ArrowRight size={18} className="hidden text-muted transition-transform duration-300 group-hover:translate-x-1 sm:block" />
                            ) : (
                                <Sparkles size={18} className="hidden text-primary sm:block" />
                            )}
                        </div>
                    ))}
                </div>
            </article>

            <article className="rounded-[2rem] border border-border bg-surface p-5 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold text-foreground">Generated dashboard draft</p>
                        <p className="mt-1 text-xs text-muted">Built from sales_overview.csv</p>
                    </div>
                    <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                        <CountUp end={4} /> widgets ready
                    </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {widgetCards.map((widget) => (
                        <article key={widget.title} className="interactive-card rounded-3xl border border-border bg-background p-4 hover:border-border-strong">
                            <span className={`mb-4 block h-2 rounded-full ${widget.width} ${widget.tone}`} />
                            <p className="text-xs text-muted">{widget.title}</p>
                            <p className="mt-2 text-2xl font-semibold text-foreground">{widget.value}</p>
                        </article>
                    ))}
                </div>

                <div className="mt-4 grid gap-3 min-[1080px]:grid-cols-[1fr_0.8fr]">
                    <div className="rounded-3xl border border-border bg-background p-4">
                        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                            <BarChart3 size={17} /> Suggested chart
                        </div>
                        <div className="flex h-28 items-end gap-2">
                            {bars.map((bar, index) => (
                                <span
                                    key={`${bar.height}-${bar.color}`}
                                    className={`bar-rise flex-1 rounded-t-xl border border-border ${bar.height} ${bar.color}`}
                                    style={{ animationDelay: `${index * 80}ms` }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-border bg-background p-4">
                        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                            <Filter size={17} /> Query block
                        </div>
                        <div className="space-y-2 text-xs text-muted">
                            <p className="rounded-full border border-border bg-surface px-3 py-2">country = United States</p>
                            <p className="rounded-full border border-border bg-surface px-3 py-2">revenue &gt; $100,000</p>
                            <p className="rounded-full border border-border bg-surface px-3 py-2 font-medium text-primary">dashboard preview refreshed</p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
