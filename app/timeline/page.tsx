"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useTimeline } from "@/context/TimelineContext";

import callIcon from "../../assets/call.png";
import textIcon from "../../assets/text.png";
import videoIcon from "../../assets/video.png";

type FilterType = "all" | "call" | "text" | "video";

const iconMap = {
  call: callIcon,
  text: textIcon,
  video: videoIcon,
};

const labelMap = {
  call: "Call",
  text: "Text",
  video: "Video",
};

export default function TimelinePage() {
  const { timeline } = useTimeline();
  const [selectedType, setSelectedType] = useState<FilterType>("all");

  const filteredTimeline =
    selectedType === "all"
      ? timeline
      : timeline.filter((item) => item.type === selectedType);

  return (
    <div className="flex min-h-screen flex-col bg-[#f3f6f8]">
      <main className="flex-1">
        <section className="px-4 pt-12 pb-16">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-[28px] font-bold text-[#1f2937]">Timeline</h1>

            <div className="mt-5">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as FilterType)}
                className="h-[36px] w-[140px] rounded-md border border-[#e5e7eb] bg-white px-3 text-[12px] text-[#94a3b8] outline-none"
              >
                <option value="all">All</option>
                <option value="call">Call</option>
                <option value="text">Text</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div className="mt-6 space-y-3">
              {filteredTimeline.length > 0 ? (
                filteredTimeline.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 rounded-md border border-[#e5e7eb] bg-white px-4 py-3 shadow-sm"
                  >
                    <div className="flex h-[30px] w-[30px] items-center justify-center">
                      <Image
                        src={iconMap[item.type]}
                        alt={item.type}
                        width={22}
                        height={22}
                        className="object-contain"
                        unoptimized
                      />
                    </div>

                    <div>
                      <p className="text-[13px] text-[#1f2937]">
                        <span className="font-semibold">
                          {labelMap[item.type]}
                        </span>{" "}
                        <span className="text-[#64748b]">with {item.name}</span>
                      </p>

                      <p className="mt-1 text-[11px] text-[#64748b]">
                        {item.date}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-md border border-[#e5e7eb] bg-white px-4 py-10 text-center text-[14px] text-[#64748b] shadow-sm">
                  No timeline entries yet.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}