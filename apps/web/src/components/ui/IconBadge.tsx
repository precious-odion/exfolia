import type { LucideIcon } from "lucide-react";

export type IconTone =
    | "primary"
    | "mint"
    | "sky"
    | "amber"
    | "lilac"
    | "rose";

const toneStyles: Record<IconTone, string> = {
    primary: "bg-primary-soft",
    mint: "bg-accent-mint-soft",
    sky: "bg-accent-sky-soft",
    amber: "bg-accent-amber-soft",
    lilac: "bg-accent-lilac-soft",
    rose: "bg-accent-rose-soft"
};

type IconBadgeProps = {
    icon: LucideIcon;
    tone?: IconTone;
    size?: "sm" | "md" | "lg";
    className?: string;
};

const sizeStyles = {
    sm: "h-9 w-9 rounded-xl",
    md: "h-11 w-11 rounded-2xl",
    lg: "h-14 w-14 rounded-2xl"
};

const iconSizes = {
    sm: 17,
    md: 20,
    lg: 24
};

export function IconBadge({
    icon: Icon,
    tone = "primary",
    size = "md",
    className = ""
}: IconBadgeProps) {
    return (
        <span
            className={`flex shrink-0 items-center justify-center ${sizeStyles[size]} ${toneStyles[tone]} ${className}`}
        >
            <Icon size={iconSizes[size]} strokeWidth={2.15} className="text-icon-ink" />
        </span>
    );
}
