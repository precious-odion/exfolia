import { Brain, Filter, Layers3 } from "lucide-react";
import { MetricCard } from "./MetricCard";

const bars = [
    "h-10 bg-accent-blue",
    "h-20 bg-primary",
    "h-16 bg-accent-purple",
    "h-28 bg-primary-dark",
    "h-14 bg-accent-amber"
];

export function WorkspacePreview() {
    return (
        <section
            id="workspace"
            className="rounded-[1.5rem] border border-border bg-surface p-4"
            aria-label="Workspace preview"
        >
            <div className="rounded-[1.1rem] border border-border bg-background p-4">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                            <Layers3 size={20} strokeWidth={2.2} />
                        </span>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                                Workspace
                            </p>
                            <h2 className="mt-1 text-lg font-semibold">Sales overview.csv</h2>
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

                <div className="mt-4 rounded-xl border border-border bg-surface p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                        <Filter size={16} />
                        Visual query
                    </div>

                    <div className="space-y-2 text-sm text-muted">
                        <p className="rounded-lg border border-border bg-background px-3 py-2">
                            revenue greater than 100000
                        </p>
                        <p className="rounded-lg border border-border bg-background px-3 py-2">
                            region equals Lagos or Abuja
                        </p>
                    </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="h-36 rounded-xl border border-border bg-surface p-4">
                        <div className="flex h-full items-end gap-2">
                            {bars.map((bar) => (
                                <span key={bar} className={`flex-1 rounded-t-md ${bar}`} />
                            ))}
                        </div>
                    </div>

                    <div className="h-36 rounded-xl border border-border bg-surface p-4">
                        <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                            <Brain size={16} />
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