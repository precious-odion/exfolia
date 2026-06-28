type AvatarTone = "mint" | "sky" | "amber" | "lilac" | "rose";

type AvatarFaceProps = {
    tone?: AvatarTone;
    hair?: "hood" | "short" | "bun" | "cap";
    glasses?: boolean;
    className?: string;
    label?: string;
};

const toneStyles: Record<AvatarTone, { bg: string; shirt: string }> = {
    mint: { bg: "#a7f3d0", shirt: "#06464e" },
    sky: { bg: "#dbeafe", shirt: "#1d4ed8" },
    amber: { bg: "#fef08a", shirt: "#92400e" },
    lilac: { bg: "#ddd6fe", shirt: "#5b21b6" },
    rose: { bg: "#fbcfe8", shirt: "#9f1239" }
};

function HairShape({ hair }: { hair: NonNullable<AvatarFaceProps["hair"]> }) {
    if (hair === "short") {
        return <path d="M24 34c2-13 12-22 25-22s22 8 25 22c-8-7-15-9-25-9s-18 3-25 9Z" fill="#101617" />;
    }

    if (hair === "bun") {
        return (
            <>
                <circle cx="66" cy="24" r="10" fill="#101617" />
                <path d="M22 42c0-17 11-29 28-29 15 0 27 10 28 27-10-10-21-12-30-12-10 0-18 4-26 14Z" fill="#101617" />
            </>
        );
    }

    if (hair === "cap") {
        return (
            <>
                <path d="M21 37c2-14 13-23 29-23 14 0 24 8 27 21H21Z" fill="#101617" />
                <path d="M47 17c11 0 21 5 28 14l-4 5c-7-5-15-8-25-8-8 0-15 2-22 7l-4-4c5-9 14-14 27-14Z" fill="#06464e" />
            </>
        );
    }

    return <path d="M15 51c0-28 15-44 37-44 19 0 34 14 34 40v15c-4-7-8-10-15-13-7-3-15-5-23-5-13 0-23 4-33 7Z" fill="#101617" />;
}

export function AvatarFace({
    tone = "mint",
    hair = "hood",
    glasses = false,
    className = "",
    label = "Illustrated user avatar"
}: AvatarFaceProps) {
    const colors = toneStyles[tone];

    return (
        <span
            className={`inline-flex shrink-0 overflow-hidden rounded-full border-2 border-background ${className}`}
            aria-label={label}
            role="img"
        >
            <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
                <rect width="96" height="96" rx="48" fill={colors.bg} />
                <HairShape hair={hair} />
                <circle cx="48" cy="45" r="25" fill="#b77850" />
                <path d="M27 48c-4 1-6 4-5 8 1 5 5 7 10 6" fill="#b77850" />
                <path d="M68 48c4 1 6 4 5 8-1 5-5 7-10 6" fill="#b77850" />
                <path d="M31 43c4-4 10-4 15-1" stroke="#101617" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M54 42c5-3 11-3 15 1" stroke="#101617" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="39" cy="51" r="3.4" fill="#101617" />
                <circle cx="59" cy="51" r="3.4" fill="#101617" />
                <path d="M49 51c-1 4-2 7-4 9 2 1 4 1 6 0" stroke="#101617" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M42 68c5 3 12 3 17 0" stroke="#101617" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                {glasses ? (
                    <>
                        <rect x="26" y="43" width="22" height="16" rx="5" fill="none" stroke="#101617" strokeWidth="3" />
                        <rect x="52" y="43" width="22" height="16" rx="5" fill="none" stroke="#101617" strokeWidth="3" />
                        <path d="M48 50h4" stroke="#101617" strokeWidth="3" strokeLinecap="round" />
                    </>
                ) : null}
                <path d="M17 96c4-17 16-27 31-27s27 10 31 27H17Z" fill={colors.shirt} />
                {hair === "hood" ? <path d="M16 96c2-22 15-34 32-34s30 13 32 34H16Z" fill="#111718" opacity="0.92" /> : null}
            </svg>
        </span>
    );
}

const avatars = [
    { tone: "mint", hair: "hood", glasses: true },
    { tone: "sky", hair: "short", glasses: false },
    { tone: "lilac", hair: "bun", glasses: true },
    { tone: "amber", hair: "cap", glasses: false }
] as const;

export function AvatarStack({ className = "" }: { className?: string }) {
    return (
        <div className={`flex -space-x-3 ${className}`} aria-label="People using Exfolia">
            {avatars.map((avatar, index) => (
                <AvatarFace
                    key={`${avatar.tone}-${avatar.hair}`}
                    tone={avatar.tone}
                    hair={avatar.hair}
                    glasses={avatar.glasses}
                    className="h-11 w-11"
                    label={`Illustrated user avatar ${index + 1}`}
                />
            ))}
        </div>
    );
}
