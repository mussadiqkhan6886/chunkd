"use client";

import { createContext, useContext, useEffect, useState } from "react";

// ------------------ TYPES ------------------

// Context shape
type DropContextType = {
  now: Date;
  getStatus: (releaseDate: string, endDate: string, soldOut: boolean, active: boolean) => string;
  getCountdown: (releaseDate: string) => string;
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

  const getStatus = (releaseDate: string, endDate: string, soldOut: boolean, active: boolean): string => {
    const release = new Date(releaseDate!);
    const end = new Date(endDate!);
    // end.setDate(end.getDate() + durationDays!);

    if (now < release) return "Coming Soon";
    if (now >= release && now < end && !soldOut && active) return "Live";
    return "Sold Out";
  };

  const getCountdown = (releaseDate: string): string => {
    const release = new Date(releaseDate!);
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
