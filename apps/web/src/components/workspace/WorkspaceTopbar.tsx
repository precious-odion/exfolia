import { Bell, Brain, ChevronDown, Languages, Layers3, Search } from "lucide-react";
import Link from "next/link";

export function WorkspaceTopbar() {
  return (
    <header className="flex h-[70px] items-center justify-between gap-4 border-b border-border bg-surface px-4 sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Link href="/" className="flex items-center gap-2 lg:hidden" aria-label="Exfolia home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
            <Layers3 size={18} strokeWidth={2.2} />
          </span>
        </Link>

        <label className="hidden min-h-10 w-full max-w-md items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm text-muted sm:flex">
          <Search size={17} />
          <input
            className="min-w-0 flex-1 bg-transparent text-foreground placeholder:text-muted focus:outline-none"
            placeholder="Search datasets, reports, and dashboards"
            type="search"
          />
        </label>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button className="hidden rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white sm:inline-flex">
          Upgrade
        </button>

        <button className="hidden items-center gap-1 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground md:inline-flex">
          <Languages size={15} />
          English
        </button>

        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white">
          <Brain size={15} />
          Ask Exfolia
        </button>

        <button className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-primary-soft sm:inline-flex">
          <Bell size={18} />
        </button>

        <button className="inline-flex items-center gap-2 rounded-full">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            EX
          </span>
          <ChevronDown className="hidden text-muted sm:block" size={16} />
        </button>
      </div>
    </header>
  );
}
