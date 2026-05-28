import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Users, MessageCircle, BookOpen, User } from "lucide-react";

const items = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/brommunity", icon: Users, label: "Bros" },
  { to: "/chat", icon: MessageCircle, label: "Chat", center: true },
  { to: "/wisdom", icon: BookOpen, label: "Wisdom" },
  { to: "/profile", icon: User, label: "You" },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-104 h-16 bg-card/80 backdrop-blur-xl border border-border rounded-2xl flex items-center justify-around px-4 z-50 shadow-bro">
      {items.map(({ to, icon: Icon, label, center }) => {
        const active = pathname === to;
        if (center) {
          return (
            <Link key={to} to={to} aria-label={label} className="flex flex-col items-center">
              <span className="size-12 bg-gradient-bro rounded-full flex items-center justify-center shadow-bro glow-bro -mt-8 border-4 border-card transition-transform active:scale-90">
                <Icon className="size-5 text-white" strokeWidth={2.5} />
              </span>
            </Link>
          );
        }
        return (
          <Link
            key={to}
            to={to}
            aria-label={label}
            className={`flex flex-col items-center gap-1 transition-all ${active ? "opacity-100" : "opacity-35 hover:opacity-60"}`}
          >
            <Icon
              className={`size-5 transition-colors ${active ? "text-matte-blue" : "text-bro-slate"}`}
              strokeWidth={active ? 2.5 : 2}
            />
            <span className={`text-[9px] font-bold uppercase tracking-wider ${active ? "text-matte-blue" : "text-bro-slate"}`}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
