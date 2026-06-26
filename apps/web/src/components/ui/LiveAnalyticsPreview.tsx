"use client";

import {
    Activity,
    ArrowUpRight,
    Bot,
    Database,
    FileSpreadsheet,
    LineChart,
    PieChart,
    Sparkles
} from "lucide-react";
import { motion } from "motion/react";
import { IconBadge } from "./IconBadge";

const categoryItems = [
    { label: "Retail", value: "38%", color: "bg-accent-amber-soft" },
    { label: "Healthcare", value: "27%", color: "bg-primary-soft" },
    { label: "Finance", value: "21%", color: "bg-accent-sky-soft" },
    { label: "Other", value: "14%", color: "bg-accent-rose-soft" }
];

const uploads = [
    { file: "sales_overview.csv", status: "Dashboard ready" },
    { file: "customer_segments.csv", status: "Schema detected" },
    { file: "regional_revenue.csv", status: "Charts generated" }
];

export function LiveAnalyticsPreview() {
    return (
        <div className="rounded-[2rem] border border-border bg-surface p-4 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
                <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                        <span className="h-3 w-3 rounded-full bg-accent-rose-soft" />
                        <span className="h-3 w-3 rounded-full bg-accent-amber-soft" />
                        <span className="h-3 w-3 rounded-full bg-accent-mint-soft" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Generated dashboard</p>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                    <span className="soft-pulse h-2 w-2 rounded-full bg-primary" /> Live analytics
                </span>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_0.85fr]">
                <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <article className="rounded-3xl border border-border bg-background p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted">Total revenue</p>
                                    <p className="mt-2 text-3xl font-semibold tracking-tight">₦12.4M</p>
                                </div>
                                <IconBadge icon={ArrowUpRight} tone="mint" />
                            </div>
                            <p className="mt-4 text-sm font-medium text-primary">+24% this month</p>
                        </article>

                        <article className="rounded-3xl border border-border bg-background p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted">Active records</p>
                                    <p className="mt-2 text-3xl font-semibold tracking-tight">2,847</p>
                                </div>
                                <IconBadge icon={Activity} tone="sky" />
                            </div>
                            <p className="mt-4 text-sm font-medium text-primary">+12% this week</p>
                        </article>
                    </div>

                    <article className="rounded-3xl border border-border bg-background p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 font-semibold">
                                <LineChart size={18} /> Revenue trend
                            </div>
                            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                                +24% growth
                            </span>
                        </div>

                        <svg viewBox="0 0 620 220" className="h-56 w-full" role="img" aria-label="Revenue trend chart">
                            <path
                                d="M20 178 H600 M20 128 H600 M20 78 H600 M20 28 H600"
                                stroke="#d6e2df"
                                strokeDasharray="4 6"
                                strokeWidth="1"
                            />
                            <path
                                d="M20 170 C90 160 120 150 170 146 C245 140 275 133 320 110 C365 87 415 96 455 102 C510 110 540 100 600 70 V208 H20 Z"
                                fill="#ddf7f2"
                                opacity="0.75"
                            />
                            <motion.path
                                d="M20 170 C90 160 120 150 170 146 C245 140 275 133 320 110 C365 87 415 96 455 102 C510 110 540 100 600 70"
                                fill="none"
                                stroke="#06464e"
                                strokeLinecap="round"
                                strokeWidth="5"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: false, amount: 0.35 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                        </svg>
                    </article>
                </div>

                <div className="space-y-4">
                    <article className="rounded-3xl border border-border bg-background p-5">
                        <div className="mb-4 flex items-center gap-2 font-semibold">
                            <PieChart size={18} /> By category
                        </div>
                        <div className="mx-auto h-36 w-36 rounded-full bg-[conic-gradient(#ddf7f2_0_38%,#fef08a_38%_65%,#dbeafe_65%_86%,#fbcfe8_86%_100%)] p-6">
                            <div className="h-full w-full rounded-full bg-background" />
                        </div>
                        <div className="mt-5 grid gap-3 text-sm text-muted sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                            {categoryItems.map((item) => (
                                <div key={item.label} className="flex items-center justify-between gap-3">
                                    <span className="flex items-center gap-2">
                                        <span className={`h-3 w-3 rounded-full ${item.color}`} />
                                        {item.label}
                                    </span>
                                    <span className="font-semibold text-foreground">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="rounded-3xl border border-border bg-primary p-5 text-white">
                        <div className="mb-4 flex items-center gap-3">
                            <IconBadge icon={Bot} tone="amber" />
                            <div>
                                <p className="font-semibold">AI summary</p>
                                <p className="text-xs text-white/70">Generated from computed metrics</p>
                            </div>
                        </div>
                        <p className="text-sm leading-6 text-white/80">
                            Revenue is rising fastest in repeat customers. The dashboard suggests
                            reviewing Lagos and Abuja segments before the next campaign.
                        </p>
                    </article>

                    <article className="rounded-3xl border border-border bg-background p-5">
                        <div className="mb-4 flex items-center gap-2 font-semibold">
                            <Sparkles size={18} /> Recent generation
                        </div>
                        <div className="space-y-3">
                            {uploads.map((upload) => (
                                <div key={upload.file} className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-3 py-3">
                                    <IconBadge icon={FileSpreadsheet} tone="sky" size="sm" />
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{upload.file}</p>
                                        <p className="text-xs text-muted">{upload.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}
