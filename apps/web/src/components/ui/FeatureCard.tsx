import type { LucideIcon } from "lucide-react";

type Accent = "primary" | "blue" | "amber" | "purple" | "rose";

const accentStyles: Record<Accent, string> = {
    primary: "bg-primary-soft text-primary",
    blue: "bg-accent-blue-soft text-accent-blue",
    amber: "bg-accent-amber-soft text-accent-amber",
    purple: "bg-accent-purple-soft text-accent-purple",
    rose: "bg-accent-rose-soft text-accent-rose"
};

type FeatureCardProps = {
    title: string;
    description: string;
    icon: LucideIcon;
    accent?: Accent;
};

export function FeatureCard({
    title,
    description,
    icon: Icon,
    accent = "primary"
}: FeatureCardProps) {
    return (
        <article className="rounded-2xl border border-border bg-surface p-5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong">
            <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${accentStyles[accent]}`}
            >
                <Icon size={19} strokeWidth={2.1} />
            </div>

            <h3 className="text-base font-semibold text-foreground">{title}</h3>

            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
        </article>
    );
}