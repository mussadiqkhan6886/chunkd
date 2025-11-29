"use client";

import { createContext, useContext, useEffect, useState } from "react";

// ------------------ TYPES ------------------
export type DropType = {
  releaseDate: string;
  durationDays: number;
  soldOut: boolean;
};

// Context shape
type DropContextType = {
  now: Date;
  getStatus: (drop: DropType) => string;
  getCountdown: (drop: DropType) => string;
};

// ------------------ DEFAULT VALUE ------------------
const DropContext = createContext<DropContextType | null>(null);

// ------------------ PROVIDER ------------------
export const DropProvider = ({ children }: { children: React.ReactNode }) => {
  const [now, setNow] = useState(new Date());

  // update clock every second
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatus = (drop: DropType): string => {
    const release = new Date(drop.releaseDate);
    const end = new Date(release);
    end.setDate(end.getDate() + drop.durationDays);

    if (now < release) return "Coming Soon";
    if (now >= release && now < end && !drop.soldOut) return "Live";
    return "Sold Out";
  };

  const getCountdown = (drop: DropType): string => {
    const release = new Date(drop.releaseDate);
    const diff = release.getTime() - now.getTime();

    if (diff <= 0) return "00 : 00 : 00 : 00";

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    return `${d}d : ${h}h : ${m}m : ${s}s`;
  };

  return (
    <DropContext.Provider value={{ now, getStatus, getCountdown }}>
      {children}
    </DropContext.Provider>
  );
};

// ------------------ HOOK ------------------
export const useDrop = () => {
  const ctx = useContext(DropContext);
  if (!ctx) throw new Error("useDrop must be used within DropProvider");
  return ctx;
};
