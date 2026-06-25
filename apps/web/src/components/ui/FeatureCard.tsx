import type { LucideIcon } from "lucide-react";
import { IconBadge } from "./IconBadge";

type IconTone = "primary" | "mint" | "sky" | "amber" | "lilac" | "rose";

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
        <article className="rounded-3xl border border-border bg-surface p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong">
            <IconBadge icon={icon} tone={tone} />

            <h3 className="mt-5 text-base font-semibold text-foreground">{title}</h3>

            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
        </article>
    );
}