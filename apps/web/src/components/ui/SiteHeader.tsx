"use client";

import { useState } from "react";
import { Layers3, Menu, X } from "lucide-react";

const navLinks = [
    { label: "Preview", href: "#live-preview" },
    { label: "Audience", href: "#audience" },
    { label: "Features", href: "#features" },
    { label: "Trust", href: "#trust" }
];

export function SiteHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function closeMenu() {
        setIsMenuOpen(false);
    }

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
                <a href="#" className="flex shrink-0 items-center gap-3" aria-label="Exfolia home" onClick={closeMenu}>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                        <Layers3 size={20} strokeWidth={2.2} className="text-white" />
                    </span>
                    <span className="text-lg font-semibold tracking-tight">Exfolia</span>
                </a>

                <nav className="hidden min-[640px]:flex items-center gap-4 text-sm text-muted lg:gap-6">
                    {navLinks.map((link) => (
                        <a key={link.href} className="transition-colors duration-150 hover:text-primary" href={link.href}>
                            {link.label}
                        </a>
                    ))}
                </nav>

                <a
                    href="#workspace"
                    className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium !text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary min-[640px]:inline-flex"
                >
                    Open workspace
                </a>

                <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-transform duration-200 active:scale-95 min-[640px]:hidden"
                    aria-label="Open menu"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen(true)}
                >
                    <Menu size={22} />
                </button>
            </div>

            {isMenuOpen ? (
                <div className="fixed inset-x-0 top-[73px] z-50 min-h-[calc(100vh-73px)] border-t border-border bg-surface px-6 py-6 min-[640px]:hidden">
                    <div className="flex items-center justify-between border-b border-border pb-5">
                        <p className="text-sm font-semibold text-primary">Menu</p>
                        <button
                            type="button"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition-transform duration-200 active:scale-95"
                            aria-label="Close menu"
                            onClick={closeMenu}
                        >
                            <X size={22} />
                        </button>
                    </div>

                    <nav className="flex min-h-[calc(100vh-210px)] flex-col pt-8">
                        <div className="space-y-7">
                            {navLinks.map((link) => (
                                <a key={link.href} href={link.href} onClick={closeMenu} className="block text-base font-semibold text-foreground">
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        <a
                            href="#workspace"
                            onClick={closeMenu}
                            className="mt-auto inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-4 text-sm font-semibold !text-white transition-transform duration-200 active:scale-[0.98]"
                        >
                            Open workspace
                        </a>
                    </nav>
                </div>
            ) : null}
        </header>
    );
}
