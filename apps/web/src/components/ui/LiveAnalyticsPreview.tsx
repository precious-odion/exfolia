"use client";

import { useState } from "react";
import { BarChart3, Brain, PieChart, TrendingUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { AvatarStack } from "./Avatar";
import { RevenueTrendChart, type TrendPoint } from "./RevenueTrendChart";
import { WorkspacePreviewTabs } from "./WorkspacePreview";

type PreviewMode = "Revenue" | "Segments" | "Forecast";

type BreakdownItem = {
    label: string;
    value: string;
    dot: string;
};

type PreviewModeConfig = {
    chartTitle: string;
    badge: string;
    valueLabel: string;
    maxValue: number;
    defaultActiveIndex: number;
    trendData: TrendPoint[];
    sideTitle: string;
    sideDescription: string;
    sideItems: BreakdownItem[];
};

const previewModes: PreviewMode[] = ["Revenue", "Segments", "Forecast"];

const modeConfig: Record<PreviewMode, PreviewModeConfig> = {
    Revenue: {
        chartTitle: "Revenue Trend",
        badge: "+24% Growth",
        valueLabel: "revenue",
        maxValue: 8000,
        defaultActiveIndex: 3,
        trendData: [
            { label: "Jan", value: 1100 },
            { label: "Feb", value: 2100 },
            { label: "Mar", value: 3000 },
            { label: "Apr", value: 6100 },
            { label: "May", value: 5200 },
            { label: "Jun", value: 7200 }
        ],
        sideTitle: "By category",
        sideDescription: "Revenue share from the current dashboard preview.",
        sideItems: [
            { label: "Retail", value: "38%", dot: "bg-accent-amber-soft" },
            { label: "Healthcare", value: "27%", dot: "bg-primary-soft" },
            { label: "Finance", value: "21%", dot: "bg-accent-sky-soft" },
            { label: "Other", value: "14%", dot: "bg-accent-rose-soft" }
        ]
    },
    Segments: {
        chartTitle: "Segment Share Trend",
        badge: "Retail leads",
        valueLabel: "share",
        maxValue: 50,
        defaultActiveIndex: 1,
        trendData: [
            { label: "Retail", value: 38 },
            { label: "Health", value: 27 },
            { label: "Finance", value: 21 },
            { label: "Other", value: 14 }
        ],
        sideTitle: "Segment movement",
        sideDescription: "Each segment is ranked by its current contribution to the filtered dataset.",
        sideItems: [
            { label: "Retail", value: "38%", dot: "bg-accent-amber-soft" },
            { label: "Healthcare", value: "27%", dot: "bg-accent-mint-soft" },
            { label: "Finance", value: "21%", dot: "bg-accent-sky-soft" },
            { label: "Other", value: "14%", dot: "bg-accent-lilac-soft" }
        ]
    },
    Forecast: {
        chartTitle: "Forecast Projection",
        badge: "Next 6 months",
        valueLabel: "forecast",
        maxValue: 10000,
        defaultActiveIndex: 3,
        trendData: [
            { label: "Jul", value: 7600 },
            { label: "Aug", value: 8100 },
            { label: "Sep", value: 8450 },
            { label: "Oct", value: 8900 },
            { label: "Nov", value: 9300 },
            { label: "Dec", value: 9700 }
        ],
        sideTitle: "Forecast confidence",
        sideDescription: "Projection uses current growth, segment lift, and recent retention pattern.",
        sideItems: [
            { label: "Growth signal", value: "Strong", dot: "bg-accent-mint-soft" },
            { label: "Retention", value: "Stable", dot: "bg-accent-sky-soft" },
            { label: "Risk", value: "Low", dot: "bg-accent-amber-soft" }
        ]
    }
};

function CategoryBreakdown({ config }: { config: PreviewModeConfig }) {
    return (
        <div className="rounded-3xl border border-border bg-background p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-2">
                <PieChart size={17} />
                <h3 className="text-sm font-semibold text-foreground">{config.sideTitle}</h3>
            </div>

            <div className="flex items-center justify-center py-2">
                <div className="relative flex h-36 w-36 items-center justify-center rounded-full category-donut">
                    <div className="h-20 w-20 rounded-full bg-background" />
                </div>
            </div>

            <p className="mt-2 text-sm leading-6 text-muted">{config.sideDescription}</p>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                {config.sideItems.map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 text-muted">
                            <span className={`h-3 w-3 rounded-full ${item.dot}`} />
                            {item.label}
                        </span>
                        <span className="font-semibold text-foreground">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SegmentBreakdown({ config }: { config: PreviewModeConfig }) {
    const widths = ["w-[42%]", "w-[22%]", "w-[16%]", "w-[7%]"];

    return (
        <div className="rounded-3xl border border-border bg-background p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-2">
                <BarChart3 size={17} />
                <h3 className="text-sm font-semibold text-foreground">{config.sideTitle}</h3>
            </div>

            <p className="text-sm leading-6 text-muted">{config.sideDescription}</p>

            <div className="mt-5 space-y-4">
                {config.sideItems.map((item, index) => (
                    <div key={item.label}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-muted">{item.label}</span>
                            <span className="font-semibold text-foreground">{item.value}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
                            <motion.span
                                className={`block h-full rounded-full bg-primary ${widths[index]}`}
                                initial={{ scaleX: 0.35 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
                                style={{ transformOrigin: "left" }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ForecastBreakdown({ config }: { config: PreviewModeConfig }) {
    return (
        <div className="rounded-3xl border border-border bg-background p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-2">
                <Brain size={17} />
                <h3 className="text-sm font-semibold text-foreground">{config.sideTitle}</h3>
            </div>

            <p className="text-sm leading-6 text-muted">{config.sideDescription}</p>

            <div className="mt-5 grid gap-3">
                {config.sideItems.map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3">
                        <span className="flex items-center gap-2 text-sm text-muted">
                            <span className={`h-3 w-3 rounded-full ${item.dot}`} />
                            {item.label}
                        </span>
                        <span className="text-sm font-semibold text-foreground">{item.value}</span>
                    </div>
                ))}
            </div>

            <div className="mt-4 rounded-2xl border border-border bg-surface px-4 py-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <TrendingUp size={16} />
                    Projected December revenue
                </p>
                <p className="mt-2 text-2xl font-semibold text-foreground">9700</p>
            </div>
        </div>
    );
}

function ModeSidePanel({ mode, config }: { mode: PreviewMode; config: PreviewModeConfig }) {
    if (mode === "Segments") return <SegmentBreakdown config={config} />;
    if (mode === "Forecast") return <ForecastBreakdown config={config} />;
    return <CategoryBreakdown config={config} />;
}

export function LiveAnalyticsPreview() {
    const [mode, setMode] = useState<PreviewMode>("Revenue");
    const activeConfig = modeConfig[mode];

    return (
        <div className="rounded-[2rem] border border-border bg-surface p-4 sm:p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
                <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                        <span className="h-3 w-3 rounded-full bg-window-red" />
                        <span className="h-3 w-3 rounded-full bg-window-yellow" />
                        <span className="h-3 w-3 rounded-full bg-window-green" />
                    </div>

                    <p className="text-sm font-semibold text-foreground">Exfolia Dashboard</p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="soft-pulse rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                        Live Data
                    </span>
                </div>
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
                {previewModes.map((item) => (
                    <button
                        key={item}
                        type="button"
                        onClick={() => setMode(item)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${mode === item
                            ? "bg-primary !text-white"
                            : "border border-border bg-background text-muted hover:text-primary"
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.35fr_0.85fr]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                    >
                        <RevenueTrendChart
                            title={activeConfig.chartTitle}
                            badge={activeConfig.badge}
                            data={activeConfig.trendData}
                            valueLabel={activeConfig.valueLabel}
                            maxValue={activeConfig.maxValue}
                            defaultActiveIndex={activeConfig.defaultActiveIndex}
                        />
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${mode}-side`}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                    >
                        <ModeSidePanel mode={mode} config={activeConfig} />
                    </motion.div>
                </AnimatePresence>
            </div>

            <WorkspacePreviewTabs className="mt-5" />
        </div>
    );
}
