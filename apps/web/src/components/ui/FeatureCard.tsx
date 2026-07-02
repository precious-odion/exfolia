import type { LucideIcon } from "lucide-react";
import { IconBadge } from "./IconBadge";

type IconTone = "primary" | "mint" | "sky" | "amber" | "lilac" | "rose";

type FeatureCardProps = {
    title: string;
    description: string;
    icon: LucideIcon;
    tone?: IconTone;
    variant?: "light" | "dark";
};

export function FeatureCard({
    title,
    description,
    icon,
    tone = "primary",
    variant = "light"
}: FeatureCardProps) {
    const isDark = variant === "dark";

    return (
        <article
            className={`rounded-3xl border p-4 ${isDark
                    ? "border-transparent bg-transparent text-white"
                    : "border-border bg-surface text-foreground"
                }`}
        >
            <IconBadge icon={icon} tone={tone} />

            <h3 className={`mt-6 text-base font-semibold ${isDark ? "text-white" : "text-foreground"}`}>
                {title}
            </h3>

            <p className={`mt-3 text-sm leading-6 ${isDark ? "text-white/70" : "text-muted"}`}>
                {description}
            </p>
        </article>
    );
}