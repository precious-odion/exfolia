import {
  BarChart3,
  Brain,
  FileText,
  HelpCircle,
  Home,
  Layers3,
  LayoutTemplate,
  //Search,
  Settings,
  ShieldCheck,
  TableProperties,
  UsersRound
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Home", icon: Home },
  { label: "Dashboard", icon: BarChart3, active: true },
  { label: "Data Sources", icon: TableProperties },
  { label: "AI Analyst", icon: Brain },
  { label: "Smart Engine", icon: ShieldCheck },
  { label: "Reports", icon: FileText },
  { label: "Templates", icon: LayoutTemplate },
  { label: "Team", icon: UsersRound },
  { label: "Settings", icon: Settings },
  { label: "Help & Contact", icon: HelpCircle }
];

export function WorkspaceSidebar() {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-border bg-surface px-4 py-5 lg:block">
      <Link href="/" className="flex items-center gap-3 px-2" aria-label="Exfolia home">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
          <Layers3 size={20} strokeWidth={2.2} />
        </span>
        <div>
          <p className="text-base font-semibold leading-none text-foreground">Exfolia</p>
          <p className="mt-1 text-[11px] font-medium text-muted">Peel back data layers</p>
        </div>
      </Link>

      <nav className="mt-10 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                item.active
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-primary-soft hover:text-primary"
              }`}
            >
              <Icon size={18} strokeWidth={2.1} />
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
