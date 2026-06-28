"use client";

import { useState } from "react";
import {
    Activity,
    ArrowUpRight,
    Bot,
    Database,
    FileSpreadsheet,
    LineChart,
    PieChart,
    Sparkles,
    TrendingUp,
    UsersRound
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { AvatarStack } from "./Avatar";
import { CountUp } from "./CountUp";
import { IconBadge } from "./IconBadge";

type PreviewMode = "Revenue" | "Segments" | "Forecast";

const previewModes: PreviewMode[] = ["Revenue", "Segments", "Forecast"];

const categoryItems = [
    { label: "Retail", value: "38%", dot: "bg-accent-amber-soft" },
    { label: "Healthcare", value: "27%", dot: "bg-primary-soft" },
    { label: "Finance", value: "21%", dot: "bg-accent-sky-soft" },
    { label: "Other", value: "14%", dot: "bg-accent-rose-soft" }
];

const uploads = [
    { file: "sales_overview.csv", status: "Dashboard ready", tone: "sky" },
    { file: "customer_segments.csv", status: "Schema detected", tone: "mint" },
    { file: "global_revenue.csv", status: "Charts generated", tone: "amber" }
] as const;

const supportCards = [
    { icon: UsersRound, title: "Audience-ready", copy: "Shareable dashboard drafts for teammates.", tone: "lilac" },
    { icon: Database, title: "Schema-aware", copy: "Charts use detected column types.", tone: "mint" },
    { icon: Sparkles, title: "AI-assisted", copy: "Insight is generated from computed context.", tone: "amber" }
] as const;

const revenuePath =
    "M20 170 C90 160 120 150 170 146 C245 140 275 133 320 110 C365 87 415 96 455 102 C510 110 540 100 600 70";

const segmentPath =
    "M20 150 C80 110 140 120 190 90 C255 52 315 72 355 96 C420 136 480 84 600 48";

const forecastPath =
    "M20 180 C95 174 145 158 205 150 C290 138 338 110 390 92 C470 64 520 82 600 38";

const modeCopy: Record<PreviewMode, { title: string; description: string; path: string; label: string }> = {
    Revenue: {
        title: "Revenue trend",
        description: "Revenue increased 24% this quarter, with the strongest lift from United States and Canada.",
        path: revenuePath,
        label: "Apr · revenue: 6100"
    },
    Segments: {
        title: "Segment growth",
        description: "Retail has the largest share, while healthcare and finance are the next strongest segments.",
        path: segmentPath,
        label: "Retail · share: 38%"
    },
    Forecast: {
        title: "Forecast view",
        description: "The next period is projected to keep growing if current customer retention stays steady.",
        path: forecastPath,
        label: "Jun · forecast: 7200"
    }
};

function TrendChart({ path, label }: { path: string; label: string }) {
    return (
        <div className="rounded-3xl border border-border bg-background p-4 sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <LineChart size={17} />
                    <h3 className="text-sm font-semibold text-foreground">Revenue Trend</h3>
                </div>
                <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-primary">+24% Growth</span>
            </div>

            <div className="relative h-72 overflow-hidden rounded-2xl bg-surface p-3">
                <svg viewBox="0 0 640 220" className="h-full w-full" role="img" aria-label="Revenue trend chart">
                    <defs>
                        <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#ddf7f2" />
                            <stop offset="100%" stopColor="#f7faf9" />
                        </linearGradient>
                    </defs>

                    {[0, 1, 2, 3].map((line) => (
                        <line key={line} x1="36" x2="620" y1={42 + line * 44} y2={42 + line * 44} stroke="#d6e2df" strokeDasharray="4 6" />
                    ))}
                    {[0, 1, 2, 3, 4, 5].map((line) => (
                        <line key={line} x1={36 + line * 116} x2={36 + line * 116} y1="30" y2="190" stroke="#d6e2df" strokeDasharray="4 6" />
                    ))}

                    <path d={`${path} L600 190 L20 190 Z`} fill="url(#revenueFill)" opacity="0.92" />
                    <path d={path} fill="none" stroke="#06464e" strokeWidth="4" strokeLinecap="round" className="chart-draw" />
                    <line x1="390" x2="390" y1="30" y2="190" stroke="#a9bbb7" />
                    <circle cx="390" cy="92" r="6" fill="#ffffff" stroke="#06464e" strokeWidth="4" />

                    {[
                        ["0", 196],
                        ["2000", 152],
                        ["4000", 108],
                        ["6000", 64],
                        ["8000", 30]
                    ].map(([text, y]) => (
                        <text key={text} x="0" y={Number(y) + 4} fontSize="12" fill="#8ba09d">{text}</text>
                    ))}

                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, index) => (
                        <text key={month} x={32 + index * 116} y="214" fontSize="12" fill="#8ba09d">{month}</text>
                    ))}
                </svg>

                <div className="absolute right-8 top-24 rounded-2xl bg-[#172235] px-4 py-3 text-sm text-white">
                    <p className="font-semibold">{label.split(" · ")[0]}</p>
                    <p className="mt-1 text-[#6ba5ff]">{label.split(" · ")[1]}</p>
                </div>
            </div>
        </div>
    );
}

function DonutChart() {
    return (
        <div className="rounded-3xl border border-border bg-background p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-2">
                <PieChart size={17} />
                <h3 className="text-sm font-semibold text-foreground">By category</h3>
            </div>

            <div className="flex items-center justify-center py-2">
                <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-[conic-gradient(#fef08a_0_38%,#ddf7f2_38%_65%,#dbeafe_65%_86%,#fbcfe8_86%_100%)]">
                    <div className="h-20 w-20 rounded-full bg-background" />
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                {categoryItems.map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 text-muted"><span className={`h-3 w-3 rounded-full ${item.dot}`} />{item.label}</span>
                        <span className="font-semibold text-foreground">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function LiveAnalyticsPreview() {
    const [mode, setMode] = useState<PreviewMode>("Revenue");
    const activeMode = modeCopy[mode];

    return (
        <div className="rounded-[2rem] border border-border bg-surface p-4 sm:p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
                <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Exfolia Dashboard</p>
                </div>

                <div className="flex items-center gap-3">
                    <AvatarStack className="hidden sm:flex" />
                    <span className="soft-pulse rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">Live Data</span>
                </div>
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
                {previewModes.map((item) => (
                    <button
                        key={item}
                        type="button"
                        onClick={() => setMode(item)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${mode === item ? "bg-primary text-white" : "border border-border bg-background text-muted hover:text-primary"
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.35fr_0.85fr]">
                <div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                        >
                            <TrendChart path={activeMode.path} label={activeMode.label} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="grid gap-4">
                    <DonutChart />

                    <article className="rounded-3xl bg-primary p-5 text-white">
                        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                            <Bot size={17} /> AI Summary
                        </div>
                        <p className="text-sm leading-6 text-white/80">{activeMode.description}</p>
                        <button type="button" className="mt-4 w-full rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold text-white transition-transform duration-200 active:scale-[0.98]">
                            View full report
                        </button>
                    </article>
                </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
                <div className="grid gap-3 sm:grid-cols-3">
                    <article className="rounded-3xl border border-border bg-background p-4">
                        <p className="text-xs text-muted">Total revenue</p>
                        <p className="mt-2 text-2xl font-semibold text-foreground"><CountUp end={12.4} decimals={1} prefix="$" />M</p>
                        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-primary"><TrendingUp size={14} /> +24% this month</p>
                    </article>
                    <article className="rounded-3xl border border-border bg-background p-4">
                        <p className="text-xs text-muted">Active rows</p>
                        <p className="mt-2 text-2xl font-semibold text-foreground"><CountUp end={48210} /></p>
                        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-primary"><Activity size={14} /> ready to query</p>
                    </article>
                    <article className="rounded-3xl border border-border bg-background p-4">
                        <p className="text-xs text-muted">Charts generated</p>
                        <p className="mt-2 text-2xl font-semibold text-foreground"><CountUp end={24} /></p>
                        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-primary"><ArrowUpRight size={14} /> auto-built</p>
                    </article>
                </div>

                <article className="rounded-3xl border border-border bg-background p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Sparkles size={17} /> Recent generation
                    </div>
                    <div className="space-y-3">
                        {uploads.map((upload) => (
                            <div key={upload.file} className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-3 py-2">
                                <IconBadge icon={FileSpreadsheet} tone={upload.tone} size="sm" />
                                <div>
                                    <p className="text-sm font-medium text-foreground">{upload.file}</p>
                                    <p className="text-xs text-muted">{upload.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
                {supportCards.map((card) => (
                    <article key={card.title} className="interactive-card flex items-center gap-3 rounded-3xl border border-border bg-background p-4 hover:border-border-strong">
                        <IconBadge icon={card.icon} tone={card.tone} size="sm" />
                        <div>
                            <p className="text-sm font-semibold text-foreground">{card.title}</p>
                            <p className="text-xs leading-5 text-muted">{card.copy}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
