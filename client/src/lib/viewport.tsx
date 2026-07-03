import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type ViewportMode = "desktop" | "phone";

const KEY = "brophet-viewport";
const DEFAULT: ViewportMode = "desktop";

type ViewportCtx = {
  mode: ViewportMode;
  setMode: (m: ViewportMode) => void;
  toggle: () => void;
};

const Ctx = createContext<ViewportCtx | null>(null);

export function ViewportProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ViewportMode>(() => {
    if (typeof localStorage === "undefined") return DEFAULT;
    const saved = localStorage.getItem(KEY);
    return saved === "phone" || saved === "desktop" ? saved : DEFAULT;
  });

  useEffect(() => {
    localStorage.setItem(KEY, mode);
    // Expose on <html> so global/utility CSS can react if needed.
    document.documentElement.dataset.viewport = mode;
  }, [mode]);

  const setMode = useCallback((m: ViewportMode) => setModeState(m), []);
  const toggle = useCallback(
    () => setModeState((m) => (m === "desktop" ? "phone" : "desktop")),
    [],
  );

  const value = useMemo(() => ({ mode, setMode, toggle }), [mode, setMode, toggle]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useViewport(): ViewportCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useViewport must be used within a ViewportProvider");
  return ctx;
}

/**
 * Classes for a page's scrolling `<main>` content area.
 * - phone: today's single narrow column.
 * - desktop: fills the width and flows the stacked sections into a
 *   responsive masonry (multi-column), keeping each card intact.
 */
export function useMainClass(phoneSpacing: "space-y-4" | "space-y-5" = "space-y-5"): string {
  const { mode } = useViewport();
  return mode === "desktop"
    ? "flex-1 px-6 pb-8 animate-fade-in lg:columns-2 2xl:columns-3 [column-gap:1.25rem] [&>*]:mb-5 [&>*]:break-inside-avoid"
    : `flex-1 px-5 ${phoneSpacing} animate-fade-in pb-4`;
}
