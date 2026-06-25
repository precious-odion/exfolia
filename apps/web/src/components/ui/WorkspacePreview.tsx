import { Brain, Filter, Layers3 } from "lucide-react";
import { IconBadge } from "./IconBadge";
import { MetricCard } from "./MetricCard";

const chartBars = [
    "h-10 bg-accent-sky-soft",
    "h-20 bg-primary-soft",
    "h-16 bg-accent-lilac-soft",
    "h-28 bg-primary-soft",
    "h-14 bg-accent-amber-soft"
];

export function WorkspacePreview() {
    return (
        <section
            id="workspace"
            className="subtle-fade-up rounded-[1.75rem] border border-border bg-surface p-4"
            aria-label="Workspace preview"
        >
            <div className="rounded-[1.35rem] border border-border bg-background p-4">
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

                    <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary-dark">
                        Ready
                    </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                    <MetricCard label="Rows" value="48,210" helper="Uploaded records" />
                    <MetricCard label="Columns" value="12" helper="Detected fields" />
                    <MetricCard label="Status" value="Clean" helper="Ready to explore" />
                </div>

                <div className="mt-4 rounded-2xl border border-border bg-surface p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                        <Filter size={16} strokeWidth={2.1} />
                        Visual query
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

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="h-40 rounded-2xl border border-border bg-surface p-4">
                        <div className="mb-3 text-sm font-medium text-foreground">
                            Suggested chart
                        </div>

                        <div className="flex h-[100px] items-end gap-2">
                            {chartBars.map((bar, index) => (
                                <span
                                    key={`${bar}-${index}`}
                                    className={`flex-1 rounded-t-lg border border-border ${bar}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="h-40 rounded-2xl border border-border bg-surface p-4">
                        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                            <Brain size={16} strokeWidth={2.1} />
                            AI insight
                        </div>

                        <p className="text-sm leading-6 text-muted">
                            Lagos is currently the strongest segment in this filtered view,
                            with higher-value transactions concentrated in fewer records.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}