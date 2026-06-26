"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

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
    y = 56,
    scale = 0.96
}: RevealProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y, scale }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.22 }}
            transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}
