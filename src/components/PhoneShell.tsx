import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface PhoneShellProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function PhoneShell({ children, hideNav }: PhoneShellProps) {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-md mx-auto bg-card min-h-screen flex flex-col relative overflow-hidden">
        <div className="flex-1 flex flex-col pb-28">{children}</div>
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}
