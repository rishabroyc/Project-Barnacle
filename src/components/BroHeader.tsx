import { Bell } from "lucide-react";

interface BroHeaderProps {
  title: string;
  subtitle?: string;
}

export function BroHeader({ title, subtitle }: BroHeaderProps) {
  return (
    <header className="px-5 pt-8 pb-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-display font-extrabold tracking-tight text-gradient-bro">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs font-semibold text-bro-slate uppercase tracking-widest mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      <button
        aria-label="Notifications"
        className="size-9 bg-soft-blue border border-border rounded-full flex items-center justify-center hover:border-matte-blue/40 transition-colors"
      >
        <Bell className="size-4 text-bro-slate" strokeWidth={2} />
      </button>
    </header>
  );
}
