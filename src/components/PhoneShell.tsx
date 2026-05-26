import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface PhoneShellProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function PhoneShell({ children, hideNav }: PhoneShellProps) {
  return (
    <div className="min-h-screen bg-surface font-body text-bro-ink">
      <div className="max-w-md mx-auto bg-card min-h-screen shadow-2xl overflow-hidden flex flex-col relative">
        <div className="flex-1 flex flex-col pb-28">{children}</div>
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}
