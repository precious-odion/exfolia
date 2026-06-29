"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
    BarChart3,
    Brain,
    CheckCircle2,
    Database,
    FileSpreadsheet,
    Filter,
    Layers3,
    Sparkles,
    Table2,
    UploadCloud
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { AvatarStack } from "./Avatar";
import { IconBadge } from "./IconBadge";
import { MetricCard } from "./MetricCard";

type PreviewTab = "Upload" | "Schema" | "Dashboard" | "AI";

const previewTabs: Array<{ label: PreviewTab; icon: LucideIcon }> = [
    { label: "Upload", icon: UploadCloud },
    { label: "Schema", icon: Database },
    { label: "Dashboard", icon: BarChart3 },
    { label: "AI", icon: Brain }
];

const schemaRows = [
    { name: "revenue", type: "number", quality: "98% clean", tone: "bg-accent-mint-soft" },
    { name: "country", type: "category", quality: "8 values", tone: "bg-accent-sky-soft" },
    { name: "signup_date", type: "date", quality: "ISO-ready", tone: "bg-accent-lilac-soft" },
    { name: "customer_type", type: "text", quality: "mapped", tone: "bg-accent-amber-soft" }
];

const chartBars = [
    { height: "h-14", color: "bg-accent-sky-soft" },
    { height: "h-20", color: "bg-primary-soft" },
    { height: "h-16", color: "bg-accent-lilac-soft" },
    { height: "h-28", color: "bg-accent-amber-soft" },
    { height: "h-[4.5rem]", color: "bg-accent-mint-soft" },
    { height: "h-24", color: "bg-accent-rose-soft" }
];

const aiBullets = [
    "United States is the strongest market in the filtered dashboard.",
    "Repeat customers are driving the highest revenue lift.",
    "The next view should compare country against customer type."
];

const panelAnimation = {
    initial: { opacity: 0, y: 16, scale: 0.985 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -8, scale: 0.985 }
};

function UploadPanel() {
    return (
        <div className="grid gap-3 min-[920px]:grid-cols-[0.9fr_1fr]">
            <article className="rounded-3xl border border-border bg-surface p-4">
                <div className="flex items-center gap-3">
                    <IconBadge icon={FileSpreadsheet} tone="sky" />
                    <div>
                        <p className="text-sm font-semibold text-foreground">sales_overview.csv</p>
                        <p className="text-xs text-muted">48,210 rows • 12 columns • 2.8 MB</p>
                    </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-surface-muted">
                    <motion.span
                        className="block h-full rounded-full bg-primary"
                        initial={{ width: "14%" }}
                        animate={{ width: ["14%", "72%", "96%"] }}
                        transition={{ duration: 3.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                    />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                    <span className="rounded-2xl border border-border bg-background px-2 py-2 text-muted">CSV</span>
                    <span className="rounded-2xl border border-border bg-background px-2 py-2 text-muted">Cleaned</span>
                    <span className="rounded-2xl border border-border bg-background px-2 py-2 font-semibold text-primary">Ready</span>
                </div>
            </article>

            <article className="rounded-3xl border border-border bg-surface p-4">
                <p className="text-sm font-semibold text-foreground">Upload activity</p>
                <div className="mt-4 space-y-3 text-sm text-muted">
                    {["Header row detected", "Empty rows skipped", "Preview table generated", "Dashboard draft created"].map((item) => (
                        <p key={item} className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-primary" /> {item}
                        </p>
                    ))}
                </div>
            </article>
        </div>
    );
}

function SchemaPanel() {
    return (
        <div className="grid gap-3 min-[920px]:grid-cols-[1fr_0.85fr]">
            <article className="rounded-3xl border border-border bg-surface p-4">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Database size={17} /> Inferred schema
                </div>

                <div className="space-y-3">
                    {schemaRows.map((row) => (
                        <div
                            key={row.name}
                            className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background px-4 py-3"
                        >
                            <div>
                                <p className="text-sm font-medium text-foreground">{row.name}</p>
                                <p className="text-xs text-muted">{row.quality}</p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold text-icon-ink ${row.tone}`}>
                                {row.type}
                            </span>
                        </div>
                    ))}
                </div>
            </article>

            <article className="rounded-3xl border border-border bg-surface p-4">
                <p className="text-sm font-semibold text-foreground">Quality score</p>
                <div className="mt-5 flex items-center justify-center">
                    <div className="relative flex h-36 w-36 items-center justify-center rounded-full quality-score-ring p-3">
                        <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-surface">
                            <span className="text-3xl font-semibold text-foreground">82%</span>
                            <span className="text-xs text-muted">ready</span>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}

function DashboardPanel() {
    return (
        <div className="grid gap-3 min-[1080px]:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-3xl border border-border bg-surface p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <BarChart3 size={17} /> Generated chart
                    </div>
                    <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-primary">
                        Auto-built
                    </span>
                </div>

                <div className="flex h-[132px] items-end gap-2">
                    {chartBars.map((bar, index) => (
                        <motion.span
                            key={`${bar.height}-${bar.color}`}
                            className={`flex-1 rounded-t-xl border border-border ${bar.height} ${bar.color}`}
                            initial={{ scaleY: 0.42, opacity: 0.45 }}
                            animate={{ scaleY: 1, opacity: 1 }}
                            transition={{ duration: 0.55, delay: index * 0.06, ease: "easeOut" }}
                            style={{ transformOrigin: "bottom" }}
                        />
                    ))}
                </div>
            </article>

            <article className="rounded-3xl border border-border bg-surface p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Filter size={17} /> Visual query
                </div>

                <div className="space-y-2 text-sm text-muted">
                    <p className="rounded-full border border-border bg-background px-4 py-2">revenue greater than $100,000</p>
                    <p className="rounded-full border border-border bg-background px-4 py-2">country equals United States or Canada</p>
                    <p className="rounded-full border border-border bg-background px-4 py-2 font-medium text-primary">
                        dashboard preview refreshed
                    </p>
                </div>
            </article>
        </div>
    );
}

function AiPanel() {
    return (
        <article className="rounded-3xl border border-border bg-surface p-4">
            <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <IconBadge icon={Sparkles} tone="amber" />
                    <div>
                        <p className="text-sm font-semibold text-foreground">AI insight draft</p>
                        <p className="text-xs text-muted">Generated from computed summaries</p>
                    </div>
                </div>
                <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-primary">Review</span>
            </div>

            <div className="space-y-3">
                {aiBullets.map((item) => (
                    <p key={item} className="flex items-start gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                        {item}
                    </p>
                ))}
            </div>
        </article>
    );
}

function TabContent({ activeTab }: { activeTab: PreviewTab }) {
    if (activeTab === "Upload") return <UploadPanel />;
    if (activeTab === "Schema") return <SchemaPanel />;
    if (activeTab === "Dashboard") return <DashboardPanel />;
    return <AiPanel />;
}

export function WorkspacePreview() {
    const [activeTab, setActiveTab] = useState<PreviewTab>("Dashboard");

    return (
        <section
            id="workspace"
            className="rounded-[2rem] border border-border bg-surface p-4 sm:p-5"
            aria-label="Workspace preview"
        >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <IconBadge icon={Layers3} tone="primary" />

                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Workspace</p>
                        <h2 className="mt-1 text-lg font-semibold text-foreground">Sales overview.csv</h2>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <AvatarStack className="hidden sm:flex" />
                    <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">Ready</span>
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
                <MetricCard label="Rows" value="48,210" helper="Uploaded records" />
                <MetricCard label="Columns" value="12" helper="Detected fields" />
                <MetricCard label="Dashboards" value="4" helper="Generated views" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 rounded-[1.4rem] border border-border bg-background p-2 min-[560px]:grid-cols-4">
                {previewTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.label;

                    return (
                        <button
                            key={tab.label}
                            type="button"
                            onClick={() => setActiveTab(tab.label)}
                            className={`inline-flex items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98] ${isActive ? "bg-primary text-white" : "bg-surface text-muted hover:bg-primary-soft hover:text-primary"
                                }`}
                        >
                            <Icon size={15} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={panelAnimation.initial}
                        animate={panelAnimation.animate}
                        exit={panelAnimation.exit}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                    >
                        <TabContent activeTab={activeTab} />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-4 grid gap-3 min-[860px]:grid-cols-[1fr_0.9fr]">
                <article className="rounded-3xl border border-border bg-surface p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Table2 size={17} /> Preview rows
                    </div>
                    <div className="space-y-2 text-xs">
                        <div className="grid grid-cols-3 rounded-full bg-background px-3 py-2 font-semibold text-foreground">
                            <span>Country</span>
                            <span>Revenue</span>
                            <span>Status</span>
                        </div>
                        <div className="grid grid-cols-3 rounded-full border border-border bg-background px-3 py-2 text-muted">
                            <span>United States</span>
                            <span>$2.4M</span>
                            <span>High</span>
                        </div>
                        <div className="grid grid-cols-3 rounded-full border border-border bg-background px-3 py-2 text-muted">
                            <span>Canada</span>
                            <span>$1.6M</span>
                            <span>Rising</span>
                        </div>
                    </div>
                </article>

                <article className="rounded-3xl border border-border bg-surface p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Brain size={17} /> Team note
                    </div>
                    <p className="text-sm leading-6 text-muted">
                        Dashboard draft is ready. Review the generated chart suggestions before saving the workspace.
                    </p>
                </article>
            </div>
        </section>
    );
}
