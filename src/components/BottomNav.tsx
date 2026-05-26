import { Link, useRouterState } from "@tanstack/react-router";
import { Home, MessageCircle, Users, User, Plus } from "lucide-react";

const items = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/brommunity", icon: Users, label: "Brommunity" },
  { to: "/chat", icon: Plus, label: "Chat", center: true },
  { to: "/wisdom", icon: MessageCircle, label: "Wisdom" },
  { to: "/profile", icon: User, label: "You" },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[26rem] h-16 bg-card/85 backdrop-blur-xl border border-border rounded-2xl shadow-bro flex items-center justify-around px-4 z-50">
      {items.map(({ to, icon: Icon, label, center }) => {
        const active = pathname === to;
        if (center) {
          return (
            <Link key={to} to={to} aria-label={label} className="flex flex-col items-center">
              <span className="size-12 bg-gradient-bro rounded-full flex items-center justify-center shadow-bro -mt-8 border-4 border-card transition-transform active:scale-90">
                <Icon className="size-5 text-primary-foreground" strokeWidth={2.5} />
              </span>
            </Link>
          );
        }
        return (
          <Link
            key={to}
            to={to}
            aria-label={label}
            className={`flex flex-col items-center gap-1 transition-opacity ${active ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
          >
            <Icon className={`size-5 ${active ? "text-matte-blue" : "text-bro-slate"}`} strokeWidth={2.25} />
            <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
