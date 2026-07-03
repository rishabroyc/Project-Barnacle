import { Monitor, Smartphone } from "lucide-react";
import { useViewport } from "@/lib/viewport";

export function ViewportToggle() {
  const { mode, toggle } = useViewport();
  const nextIsPhone = mode === "desktop";

  return (
    <button
      onClick={toggle}
      aria-label={nextIsPhone ? "Switch to phone size" : "Switch to full screen"}
      title={nextIsPhone ? "Switch to phone size" : "Switch to full screen"}
      className="fixed top-4 right-4 z-[60] flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur-xl px-3 py-2 text-xs font-bold text-bro-slate shadow-bro transition-colors hover:border-matte-blue/40 hover:text-matte-blue"
    >
      {nextIsPhone ? <Smartphone className="size-4" /> : <Monitor className="size-4" />}
      <span className="hidden sm:inline uppercase tracking-wider">
        {nextIsPhone ? "Phone view" : "Full screen"}
      </span>
    </button>
  );
}
