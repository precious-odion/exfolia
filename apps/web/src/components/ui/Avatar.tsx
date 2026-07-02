"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const people = [
    {
        src: "/people/person-1.jpg",
        alt: "Data analyst reviewing analytics dashboard",
        name: "Rose Silver",
        role: "Data Analyst"
    },
    {
        src: "/people/person-2.jpg",
        alt: "Growth lead exploring business data",
        name: "Rio Gonzales",
        role: "Founder"
    },
    {
        src: "/people/person-3.jpg",
        alt: "Product manager working with reports",
        name: "Freda Hitler",
        role: "Product Manager"
    },
    {
        src: "/people/person-4.jpg",
        alt: "Founder analyzing CSV data",
        name: "John Grundy",
        role: "Data Scientist"
    }
];

type AvatarPhotoProps = {
    src: string;
    alt: string;
    className?: string;
};

export function AvatarPhoto({ src, alt, className = "" }: AvatarPhotoProps) {
    return (
        <span
            className={`inline-flex shrink-0 overflow-hidden rounded-full border-2 border-background bg-surface ${className}`}
        >
            <img src={src} alt={alt} className="h-full w-full object-cover" />
        </span>
    );
}

export function AvatarStack({ className = "" }: { className?: string }) {
    return (
        <div className={`flex -space-x-3 ${className}`} aria-label="People using Exfolia">
            {people.map((person) => (
                <AvatarPhoto
                    key={person.src}
                    src={person.src}
                    alt={person.alt}
                    className="h-11 w-11"
                />
            ))}
        </div>
    );
}

export function HeroPeopleCards({ className = "" }: { className?: string }) {
    const [current, setCurrent] = useState(0);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (reduceMotion) return;

        const intervalId = window.setInterval(() => {
            setCurrent((value) => (value + 1) % people.length);
        }, 3000);

        return () => window.clearInterval(intervalId);
    }, [reduceMotion]);

    const getPerson = (offset: number) =>
        people[(current + offset) % people.length];

    return (
        <div
            className={`relative w-full overflow-hidden py-2 ${className}`}
            aria-label="Professionals using Exfolia"
        >
            <div className="hero-people-fade hero-people-fade-left" />
            <div className="hero-people-fade hero-people-fade-right" />

            <div className="flex w-full gap-2 sm:gap-3 lg:gap-4">
                {[0, 1, 2].map((offset, index) => {
                    const person = getPerson(offset);
                    const isMiddle = index === 1;

                    return (
                        <article
                            key={index}
                            className={`relative h-[320px] min-w-0 overflow-hidden rounded-lg sm:h-[340px] lg:h-[365px] ${isMiddle ? "flex-[1.5] lg:flex-1" : "flex-1"
                                }`}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={person.src}
                                    initial={reduceMotion ? false : { x: "100%" }}
                                    animate={{ x: 0 }}
                                    exit={reduceMotion ? { x: 0 } : { x: "-100%" }}
                                    transition={{
                                        duration: reduceMotion ? 0 : 0.5,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0"
                                >
                                    <img
                                        src={person.src}
                                        alt={person.alt}
                                        loading="eager"
                                        className="h-full w-full object-cover object-center"
                                    />

                                    <div className="hero-photo-overlay absolute inset-0" />

                                    <div className="absolute inset-x-0 bottom-0 z-10 p-2 text-white sm:p-3 lg:p-4">
                                        <div className="flex min-w-0 items-center gap-1">
                                            <p className="truncate text-[11px] font-semibold sm:text-xs lg:text-sm">
                                                {person.name}
                                            </p>
                                            <CheckCircle2
                                                size={15}
                                                className="shrink-0 text-accent-mint-soft"
                                            />
                                        </div>
                                        <p className="mt-1 truncate text-[10px] font-medium text-white/80 sm:text-[11px] lg:text-xs">
                                            {person.role}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

export function PeoplePreview({ className = "" }: { className?: string }) {
    return (
        <div className={`grid gap-3 sm:grid-cols-3 ${className}`}>
            {people.slice(0, 3).map((person) => (
                <div
                    key={person.src}
                    className="overflow-hidden rounded-3xl border border-border bg-surface"
                >
                    <img src={person.src} alt={person.alt} className="h-44 w-full object-cover" />
                </div>
            ))}
        </div>
    );
}
