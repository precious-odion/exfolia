type MetricCardProps = {
    label: string;
    value: string;
    helper: string;
};

export function MetricCard({ label, value, helper }: MetricCardProps) {
    return (
        <article className="rounded-2xl border border-border bg-surface p-4 transition-transform duration-300 hover:-translate-y-1">
            <p className="text-xs font-medium text-muted">{label}</p>

            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                {value}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
        </article>
    );
}
