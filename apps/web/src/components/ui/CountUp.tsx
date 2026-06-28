"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
    end: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    compact?: boolean;
};

function formatValue(value: number, decimals: number, compact: boolean) {
    if (compact) {
        return new Intl.NumberFormat("en-US", {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals,
            notation: "compact"
        }).format(value);
    }

    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
    }).format(value);
}

export function CountUp({
    end,
    duration = 1300,
    prefix = "",
    suffix = "",
    decimals = 0,
    compact = false
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement | null>(null);
    const [value, setValue] = useState(0);
    const [hasRun, setHasRun] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node || hasRun) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting || hasRun) return;

                setHasRun(true);
                const start = performance.now();

                function tick(now: number) {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    setValue(end * eased);

                    if (progress < 1) {
                        requestAnimationFrame(tick);
                    }
                }

                requestAnimationFrame(tick);
            },
            { threshold: 0.35 }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [duration, end, hasRun]);

    return (
        <span ref={ref}>
            {prefix}
            {formatValue(value, decimals, compact)}
            {suffix}
        </span>
    );
}
