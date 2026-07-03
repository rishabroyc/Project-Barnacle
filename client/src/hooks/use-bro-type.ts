import { useState, useEffect } from "react";
import type { BroType } from "@/lib/ai";

const KEY = "brophet-bro-type";
const DEFAULT: BroType = "The Chill Ox";

export function useBroType() {
  const [broType, setBroTypeState] = useState<BroType>(DEFAULT);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as BroType | null;
    if (saved) setBroTypeState(saved);
    setLoaded(true);
  }, []);

  const setBroType = (type: BroType) => {
    setBroTypeState(type);
    localStorage.setItem(KEY, type);
  };

  return { broType, setBroType, loaded };
}
