"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type TimelineItem = {
  id: number;
  type: "call" | "text" | "video";
  name: string;
  date: string;
};

type TimelineContextType = {
  timeline: TimelineItem[];
  addEvent: (event: Omit<TimelineItem, "id">) => void;
};

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

export const TimelineProvider = ({ children }: { children: ReactNode }) => {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

  const addEvent = (event: Omit<TimelineItem, "id">) => {
    setTimeline((prev) => [{ id: Date.now(), ...event }, ...prev]);
  };

  return (
    <TimelineContext.Provider value={{ timeline, addEvent }}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => {
  const context = useContext(TimelineContext);

  if (!context) {
    throw new Error("useTimeline must be used inside TimelineProvider");
  }

  return context;
};