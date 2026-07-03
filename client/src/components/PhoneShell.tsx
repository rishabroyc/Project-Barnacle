import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { useViewport } from "@/lib/viewport";

interface PhoneShellProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function PhoneShell({ children, hideNav }: PhoneShellProps) {
  const { mode } = useViewport();
  const desktop = mode === "desktop";

  return (
    <div className="min-h-screen bg-surface">
      <div
        className={`mx-auto bg-card min-h-screen flex flex-col relative ${
          desktop ? "max-w-6xl" : "max-w-md overflow-hidden"
        }`}
      >
        <div className="flex-1 flex flex-col pb-28">{children}</div>
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}
