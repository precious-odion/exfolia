type MetricCardProps = {
    label: string;
    value: string;
    helper: string;
};

export function MetricCard({ label, value, helper }: MetricCardProps) {
    return (
        <article className="interactive-card rounded-2xl border border-border bg-surface p-4 hover:border-border-strong">
            <p className="text-xs font-medium text-muted">{label}</p>

            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                {value}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
        </article>
    );
}
