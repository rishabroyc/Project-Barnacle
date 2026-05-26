import { Bell } from "lucide-react";

interface BroHeaderProps {
  title: string;
  subtitle?: string;
}

export function BroHeader({ title, subtitle }: BroHeaderProps) {
  return (
    <header className="px-6 pt-8 pb-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-display font-extrabold tracking-tight text-matte-blue">{title}</h1>
        {subtitle && (
          <p className="text-xs font-semibold text-bro-slate/60 uppercase tracking-widest mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      <button
        aria-label="Notifications"
        className="bg-soft-blue p-2.5 rounded-full hover:scale-105 transition-transform"
      >
        <Bell className="size-4 text-matte-blue" strokeWidth={2.5} />
      </button>
    </header>
  );
}
