"use client";

import { useMemo, useState } from "react";

export type TrendPoint = {
    label: string;
    value: number;
};

type RevenueTrendChartProps = {
    title?: string;
    badge?: string;
    data?: TrendPoint[];
    valueLabel?: string;
    maxValue?: number;
    defaultActiveIndex?: number;
};

const defaultRevenueData = [
    { label: "Jan", value: 1100 },
    { label: "Feb", value: 2100 },
    { label: "Mar", value: 3000 },
    { label: "Apr", value: 6100 },
    { label: "May", value: 5200 },
    { label: "Jun", value: 7200 }
];

const chartWidth = 640;
const chartHeight = 260;
const padding = {
    top: 26,
    right: 26,
    bottom: 38,
    left: 48
};

function getPoint(index: number, value: number, dataLength: number, maxValue: number) {
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;

    const x = padding.left + (index / (dataLength - 1)) * innerWidth;
    const y = padding.top + innerHeight - (value / maxValue) * innerHeight;

    return { x, y };
}

export function RevenueTrendChart({
    title = "Revenue Trend",
    badge = "+24% Growth",
    data = defaultRevenueData,
    valueLabel = "revenue",
    maxValue = 8000,
    defaultActiveIndex = 3
}: RevenueTrendChartProps) {
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

    const points = useMemo(
        () => data.map((item, index) => getPoint(index, item.value, data.length, maxValue)),
        [data, maxValue]
    );

    const gridValues = useMemo(() => {
        const step = maxValue / 4;
        return [0, step, step * 2, step * 3, maxValue].map((value) => Math.round(value));
    }, [maxValue]);

    const linePath = points
        .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
        .join(" ");

    const areaPath = `${linePath} L ${points[points.length - 1]?.x} ${chartHeight - padding.bottom
        } L ${points[0]?.x} ${chartHeight - padding.bottom} Z`;

    const activeData = data[activeIndex];
    const activePoint = points[activeIndex];

    function handleMouseMove(event: React.MouseEvent<SVGSVGElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const scaledX = (mouseX / rect.width) * chartWidth;

        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        points.forEach((point, index) => {
            const distance = Math.abs(point.x - scaledX);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        setActiveIndex(closestIndex);
    }

    return (
        <div className="relative rounded-3xl border border-border bg-surface p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="font-semibold text-foreground">{title}</h3>
                <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-primary">
                    {badge}
                </span>
            </div>

            <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="h-[280px] w-full cursor-crosshair"
                role="img"
                aria-label={`${title} chart`}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setActiveIndex(defaultActiveIndex)}
            >
                {gridValues.map((value) => {
                    const y = getPoint(0, value, data.length, maxValue).y;

                    return (
                        <g key={value}>
                            <line
                                x1={padding.left}
                                x2={chartWidth - padding.right}
                                y1={y}
                                y2={y}
                                stroke="var(--chart-grid)"
                                strokeDasharray="4 6"
                            />
                            <text
                                x={padding.left - 12}
                                y={y + 4}
                                textAnchor="end"
                                className="fill-muted text-[12px]"
                            >
                                {value}
                            </text>
                        </g>
                    );
                })}

                {data.map((item, index) => {
                    const point = points[index];

                    return (
                        <g key={item.label}>
                            <line
                                x1={point.x}
                                x2={point.x}
                                y1={padding.top}
                                y2={chartHeight - padding.bottom}
                                stroke="var(--chart-grid)"
                                strokeDasharray="4 6"
                            />
                            <text
                                x={point.x}
                                y={chartHeight - 10}
                                textAnchor="middle"
                                className="fill-muted text-[12px]"
                            >
                                {item.label}
                            </text>
                        </g>
                    );
                })}

                <path d={areaPath} fill="var(--chart-area)" opacity="0.75" />

                <path
                    d={linePath}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {activePoint ? (
                    <>
                        <line
                            x1={activePoint.x}
                            x2={activePoint.x}
                            y1={padding.top}
                            y2={chartHeight - padding.bottom}
                            stroke="var(--chart-grid-strong)"
                        />

                        <circle
                            cx={activePoint.x}
                            cy={activePoint.y}
                            r="7"
                            fill="var(--surface)"
                            stroke="var(--primary)"
                            strokeWidth="4"
                        />
                    </>
                ) : null}
            </svg>

            {activeData && activePoint ? (
                <div
                    className="pointer-events-none absolute rounded-2xl bg-chart-tooltip px-4 py-3 text-white"
                    style={{
                        left: `min(calc(${(activePoint.x / chartWidth) * 100}% + 12px), calc(100% - 150px))`,
                        top: `${activePoint.y + 58}px`
                    }}
                >
                    <p className="text-sm font-semibold">{activeData.label}</p>
                    <p className="mt-1 text-sm text-chart-tooltip-accent">
                        {valueLabel}: {activeData.value}
                    </p>
                </div>
            ) : null}
        </div>
    );
}
