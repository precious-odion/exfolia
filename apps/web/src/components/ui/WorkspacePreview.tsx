"use client";

import { useState } from "react";
import {
    BarChart3,
    Brain,
    CheckCircle2,
    Database,
    FileSpreadsheet,
    Filter,
    Layers3,
    Table2
} from "lucide-react";
import { motion } from "motion/react";
import { IconBadge } from "./IconBadge";
import { MetricCard } from "./MetricCard";

const previewTabs = [
    "Upload",
    "Schema",
    "Dashboard",
    "AI"
] as const;

type PreviewTab = (typeof previewTabs)[number];

const chartBars = [
    "h-10 bg-accent-sky-soft",
    "h-20 bg-primary-soft",
    "h-14 bg-accent-lilac-soft",
    "h-28 bg-primary-soft",
    "h-16 bg-accent-amber-soft",
    "h-24 bg-accent-rose-soft"
];

const schemaRows = [
    { name: "revenue", type: "number", tone: "bg-accent-mint-soft" },
    { name: "region", type: "category", tone: "bg-accent-sky-soft" },
    { name: "signup_date", type: "date", tone: "bg-accent-lilac-soft" }
];

function TabContent({ activeTab }: { activeTab: PreviewTab }) {
    if (activeTab === "Upload") {
        return (
            <div className="grid gap-3 md:grid-cols-[0.9fr_1fr]">
                <div className="rounded-2xl border border-border bg-surface p-4">
                    <div className="flex items-center gap-3">
                        <IconBadge icon={FileSpreadsheet} tone="sky" />
                        <div>
                            <p className="text-sm font-semibold text-foreground">sales_overview.csv</p>
                            <p className="text-xs text-muted">48,210 rows • 12 columns</p>
                        </div>
                    </div>
                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-surface-muted">
                        <motion.span
                            className="block h-full rounded-full bg-primary"
                            initial={{ width: "18%" }}
                            animate={{ width: "86%" }}
                            transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse" }}
                        />
                    </div>
                    <p className="mt-3 text-xs text-muted">Reading file and preparing columns</p>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-4">
                    <p className="text-sm font-semibold text-foreground">Upload activity</p>
                    <div className="mt-4 space-y-3 text-sm text-muted">
                        <p className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-primary" /> Header row detected
                        </p>
                        <p className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-primary" /> Empty rows skipped
                        </p>
                        <p className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-primary" /> Preview generated
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (activeTab === "Schema") {
        return (
            <div className="rounded-2xl border border-border bg-surface p-4">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Database size={17} /> Inferred schema
                </div>
                <div className="space-y-3">
                    {schemaRows.map((row) => (
                        <div
                            key={row.name}
                            className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3"
                        >
                            <span className="text-sm font-medium text-foreground">{row.name}</span>
                            <span className={`rounded-full px-3 py-1 text-xs text-icon-ink ${row.tone}`}>
                                {row.type}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (activeTab === "Dashboard") {
        return (
            <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                        <BarChart3 size={17} /> Generated chart
                    </div>
                    <div className="flex h-[120px] items-end gap-2">
                        {chartBars.map((bar, index) => (
                            <span
                                key={`${bar}-${index}`}
                                className={`chart-grow flex-1 rounded-t-lg border border-border ${bar}`}
                                style={{ animationDelay: `${index * 90}ms` }}
                            />
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Filter size={17} /> Visual query
                    </div>
                    <div className="space-y-2 text-sm text-muted">
                        <p className="rounded-full border border-border bg-background px-4 py-2">
                            revenue greater than 100000
                        </p>
                        <p className="rounded-full border border-border bg-background px-4 py-2">
                            region equals Lagos or Abuja
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-border bg-surface p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Brain size={17} /> AI insight
            </div>
            <p className="text-sm leading-6 text-muted">
                Lagos is currently the strongest segment in this filtered view, with
                higher-value transactions concentrated in fewer records.
            </p>
            <div className="mt-4 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-amber-soft text-xs font-semibold text-icon-ink">
                    PO
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-lilac-soft text-xs font-semibold text-icon-ink">
                    AI
                </span>
                <p className="text-xs text-muted">Insight prepared for review</p>
            </div>
        </div>
    );
}

export function WorkspacePreview() {
    const [activeTab, setActiveTab] = useState<PreviewTab>("Dashboard");

    return (
        <motion.section
            id="workspace"
            className="rounded-[1.75rem] border border-border bg-surface p-4"
            aria-label="Workspace preview"
            initial={{ opacity: 0, y: 56, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="dashboard-grid rounded-[1.35rem] border border-border bg-background p-4">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <IconBadge icon={Layers3} tone="primary" />

                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                                Workspace
                            </p>
                            <h2 className="mt-1 text-lg font-semibold text-foreground">
                                Sales overview.csv
                            </h2>
                        </div>
                    </div>

                    <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
                        Ready
                    </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                    <MetricCard label="Rows" value="48,210" helper="Uploaded records" />
                    <MetricCard label="Columns" value="12" helper="Detected fields" />
                    <MetricCard label="Dashboards" value="4" helper="Generated views" />
                </div>

                <div className="mt-4 rounded-2xl border border-border bg-surface p-2">
                    <div className="grid grid-cols-4 gap-2">
                        {previewTabs.map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={`rounded-full px-3 py-2 text-xs font-semibold transition-all duration-200 ${activeTab === tab
                                        ? "bg-primary !text-white"
                                        : "bg-background text-muted hover:text-primary"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    key={activeTab}
                    className="mt-4"
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35 }}
                >
                    <TabContent activeTab={activeTab} />
                </motion.div>
            </div>
        </motion.section>
    );
}
