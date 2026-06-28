"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    scale?: number;
};

export function Reveal({
    children,
    className,
    delay = 0,
    y = 40,
    scale = 0.98
}: RevealProps) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y, scale }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.22, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}