"use client";

import { useMemo, useState } from "react";

const revenueData = [
    { month: "Jan", value: 1100 },
    { month: "Feb", value: 2100 },
    { month: "Mar", value: 3000 },
    { month: "Apr", value: 6100 },
    { month: "May", value: 5200 },
    { month: "Jun", value: 7200 }
];

const chartWidth = 640;
const chartHeight = 260;
const padding = {
    top: 26,
    right: 26,
    bottom: 38,
    left: 48
};

function getPoint(index: number, value: number) {
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;
    const maxValue = 8000;

    const x = padding.left + (index / (revenueData.length - 1)) * innerWidth;
    const y = padding.top + innerHeight - (value / maxValue) * innerHeight;

    return { x, y };
}

export function RevenueTrendChart() {
    const [activeIndex, setActiveIndex] = useState(3);

    const points = useMemo(
        () => revenueData.map((item, index) => getPoint(index, item.value)),
        []
    );

    const linePath = points
        .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
        .join(" ");

    const areaPath = `${linePath} L ${points[points.length - 1]?.x} ${chartHeight - padding.bottom
        } L ${points[0]?.x} ${chartHeight - padding.bottom} Z`;

    const activeData = revenueData[activeIndex];
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
                <h3 className="font-semibold text-foreground">Revenue Trend</h3>
                <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-primary">
                    +24% Growth
                </span>
            </div>

            <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="h-[280px] w-full cursor-crosshair"
                role="img"
                aria-label="Revenue trend chart"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setActiveIndex(3)}
            >
                {[0, 2000, 4000, 6000, 8000].map((value) => {
                    const y = getPoint(0, value).y;

                    return (
                        <g key={value}>
                            <line
                                x1={padding.left}
                                x2={chartWidth - padding.right}
                                y1={y}
                                y2={y}
                                stroke="#dbe7e4"
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

                {revenueData.map((item, index) => {
                    const point = points[index];

                    return (
                        <g key={item.month}>
                            <line
                                x1={point.x}
                                x2={point.x}
                                y1={padding.top}
                                y2={chartHeight - padding.bottom}
                                stroke="#e3eeeb"
                                strokeDasharray="4 6"
                            />
                            <text
                                x={point.x}
                                y={chartHeight - 10}
                                textAnchor="middle"
                                className="fill-muted text-[12px]"
                            >
                                {item.month}
                            </text>
                        </g>
                    );
                })}

                <path d={areaPath} fill="#ddf7f2" opacity="0.75" />

                <path
                    d={linePath}
                    fill="none"
                    stroke="#06464e"
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
                            stroke="#9eb5b0"
                        />

                        <circle
                            cx={activePoint.x}
                            cy={activePoint.y}
                            r="7"
                            fill="#ffffff"
                            stroke="#06464e"
                            strokeWidth="4"
                        />
                    </>
                ) : null}
            </svg>

            {activeData && activePoint ? (
                <div
                    className="pointer-events-none absolute rounded-2xl bg-[#111827] px-4 py-3 text-white"
                    style={{
                        left: `min(calc(${(activePoint.x / chartWidth) * 100}% + 12px), calc(100% - 150px))`,
                        top: `${activePoint.y + 58}px`
                    }}
                >
                    <p className="text-sm font-semibold">{activeData.month}</p>
                    <p className="mt-1 text-sm text-[#3b82f6]">
                        revenue: {activeData.value}
                    </p>
                </div>
            ) : null}
        </div>
    );
}