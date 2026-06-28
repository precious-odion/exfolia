import type { LucideIcon } from "lucide-react";
import { IconBadge, type IconTone } from "./IconBadge";

type FeatureCardProps = {
    title: string;
    description: string;
    icon: LucideIcon;
    tone?: IconTone;
};

export function FeatureCard({
    title,
    description,
    icon,
    tone = "primary"
}: FeatureCardProps) {
    return (
        <article className="interactive-card group h-full rounded-3xl border border-border bg-surface p-6 hover:border-border-strong">
            <IconBadge
                icon={icon}
                tone={tone}
                className="transition-transform duration-300 group-hover:scale-110"
            />

            <h3 className="mt-5 text-base font-semibold text-foreground">{title}</h3>

            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
        </article>
    );
}
