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
    //Table2,
    UploadCloud
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { AvatarStack } from "./Avatar";
import { IconBadge } from "./IconBadge";
import { MetricCard } from "./MetricCard";
//import { RevenueTrendChart } from "./RevenueTrendChart";

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
        <article className="rounded-3xl p-4">
            <div className="flex flex-col gap-4 min-[720px]:flex-row min-[720px]:items-center min-[720px]:justify-between">
                <div className="flex items-center gap-3">
                    <IconBadge icon={FileSpreadsheet} tone="sky" />
                    <div>
                        <p className="text-sm font-semibold text-foreground">sales_overview.csv</p>
                        <p className="text-xs text-muted">48,210 rows • 12 columns • 2.8 MB</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs min-[720px]:w-72">
                    <span className="rounded-2xl border border-border bg-background px-2 py-2 text-muted">CSV</span>
                    <span className="rounded-2xl border border-border bg-background px-2 py-2 text-muted">Cleaned</span>
                    <span className="rounded-2xl border border-border bg-background px-2 py-2 font-semibold text-primary">Ready</span>
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

            <div className="mt-4 grid gap-2 text-xs text-muted sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-background px-3 py-2">
                    <p className="font-semibold text-foreground">3 issues fixed</p>
                    <p>Empty rows removed</p>
                </div>

                <div className="rounded-2xl border border-border bg-background px-3 py-2">
                    <p className="font-semibold text-foreground">12 fields mapped</p>
                    <p>Types detected</p>
                </div>

                <div className="rounded-2xl border border-border bg-background px-3 py-2">
                    <p className="font-semibold text-foreground">Preview ready</p>
                    <p>Rows available</p>
                </div>
            </div>
        </article>
    );
}

function SchemaPanel() {
    return (
        <article className="rounded-3xl p-4">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Database size={17} /> Inferred schema
            </div>

            <div className="grid gap-3 min-[720px]:grid-cols-2">
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
    );
}

function DashboardPanel() {
    return (
        <div className="rounded-3xl p-3">
            <div className="grid gap-3 sm:grid-cols-2">
                <article className="rounded-2xl border border-border bg-surface px-4 py-3">
                    <p className="text-xs text-muted">Total revenue</p>
                    <p className="mt-1 text-xl font-semibold text-foreground">$12.4M</p>
                    <p className="mt-1 text-xs font-medium text-primary">↗ +24% this month</p>
                </article>

                <article className="rounded-2xl border border-border bg-surface px-4 py-3">
                    <p className="text-xs text-muted">Active rows</p>
                    <p className="mt-1 text-xl font-semibold text-foreground">48,210</p>
                    <p className="mt-1 text-xs font-medium text-primary">↗ ready to query</p>
                </article>
            </div>

            <div className="mt-3 grid gap-3 min-[720px]:grid-cols-[minmax(0,1fr)_16rem]">
                <article className="rounded-2xl border border-border bg-surface p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h3 className="text-sm font-semibold text-foreground">Dashboard preview</h3>
                            <p className="mt-1 text-xs text-muted">Revenue movement</p>
                        </div>

                        <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                            Auto-built
                        </span>
                    </div>

                    <div className="mt-3 h-28">
                        <svg viewBox="0 0 520 120" className="h-full w-full" role="img" aria-label="Revenue trend preview">
                            <path
                                d="M18 92 C80 84 118 76 172 73 C232 70 270 62 318 46 C374 28 414 38 466 34 C492 31 510 24 520 18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                className="text-primary"
                            />
                            <path
                                d="M18 92 C80 84 118 76 172 73 C232 70 270 62 318 46 C374 28 414 38 466 34 C492 31 510 24 520 18 L520 112 L18 112 Z"
                                className="fill-primary-soft"
                            />
                        </svg>
                    </div>
                </article>

                <article className="rounded-2xl bg-surface p-4">
                    <div className="flex items-center gap-2">
                        <IconBadge icon={Brain} size="sm" />
                        <h3 className="text-sm font-semibold text-foreground">AI Insight</h3>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-muted">
                        Revenue is 24% above the previous period, led by United States and Canada.
                    </p>
                </article>
            </div>
        </div>
    );
}

function AiPanel() {
    return (
        <article className="rounded-3xl p-4">
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


function QualityScoreCard() {
    return (
        <article className="rounded-3xl border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-foreground">Quality score</p>
            <div className="mt-4 flex items-center gap-4">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full quality-score-ring p-2">
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-surface">
                        <span className="text-xl font-semibold text-foreground">82%</span>
                        <span className="text-[10px] text-muted">ready</span>
                    </div>
                </div>
                <p className="text-sm leading-6 text-muted">
                    Revenue and country are ready for the dashboard preview.
                </p>
            </div>
        </article>
    );
}

function WorkspaceSideRail({ activeTab }: { activeTab: PreviewTab }) {
    if (activeTab === "Upload") {
        return (
            <>
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
            </>
        );
    }

    if (activeTab === "Schema") {
        return (
            <>
                <QualityScoreCard />
            </>
        );
    }

    if (activeTab === "Dashboard") {
        return (
            <>
                <article className="rounded-3xl border border-border bg-surface p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Filter size={17} /> Visual query
                    </div>

                    <div className="space-y-2 text-sm text-muted">
                        <p className="rounded-2xl border border-border bg-background px-3 py-2">revenue greater than $100,000</p>
                        <p className="rounded-2xl border border-border bg-background px-3 py-2">country equals United States or Canada</p>
                        <p className="rounded-2xl border border-border bg-background px-3 py-2 font-medium text-primary">
                            dashboard preview refreshed
                        </p>
                    </div>
                </article>
            </>
        );
    }

    return (
        <>
            <article className="rounded-3xl border border-border bg-surface p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Brain size={17} /> Team note
                </div>
                <p className="text-sm leading-6 text-muted">
                    Dashboard draft is ready. Review the generated insight suggestions before saving the workspace.
                </p>
            </article>
        </>
    );
}

export function WorkspacePreviewTabs({ className = "" }: { className?: string }) {
    const [activeTab, setActiveTab] = useState<PreviewTab>("Dashboard");

    return (
        <div className={className}>
            <div className="mt-4 grid grid-cols-2 gap-2 rounded-[1.4rem] p-2 min-[560px]:grid-cols-4">
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

            <div className="mt-4 grid items-start gap-3 min-[980px]:grid-cols-[minmax(0,1fr)_20rem]">
                <div className="overflow-hidden">
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

                <aside className="grid content-start gap-3 min-[980px]:mt-4">
                    <WorkspaceSideRail activeTab={activeTab} />
                </aside>
            </div>
        </div>
    );
}

export function WorkspacePreview() {
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

            <WorkspacePreviewTabs />
        </section>
    );
}
