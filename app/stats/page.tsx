"use client";

import Footer from "@/components/Footer";
import { useTimeline } from "@/context/TimelineContext";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function StatsPage() {
  const { timeline } = useTimeline();

  const textCount = timeline.filter((item) => item.type === "text").length;
  const callCount = timeline.filter((item) => item.type === "call").length;
  const videoCount = timeline.filter((item) => item.type === "video").length;

  const data = [
    { name: "Text", value: textCount, color: "#7c3aed" },
    { name: "Call", value: callCount, color: "#1f5a49" },
    { name: "Video", value: videoCount, color: "#34a853" },
  ].filter((item) => item.value > 0);

  const totalInteractions = textCount + callCount + videoCount;

  return (
    <main className="min-h-screen bg-[#f3f6f8]">
      <section className="px-4 pt-14 pb-14">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[28px] font-bold text-[#1f2937]">
            Friendship Analytics
          </h1>

          <div className="mt-6 rounded-md border border-[#e5e7eb] bg-white px-6 py-6 shadow-sm">
            <h2 className="text-[16px] font-semibold text-[#2f5d50]">
              By Interaction Type
            </h2>

            {totalInteractions === 0 ? (
              <div className="mt-10 rounded-md border border-dashed border-[#d1d5db] bg-[#f8fafc] px-4 py-12 text-center">
                <p className="text-[15px] font-medium text-[#1f2937]">
                  No interaction data yet
                </p>
                <p className="mt-2 text-[13px] text-[#64748b]">
                  Add some Call, Text, or Video entries from the friend details page.
                </p>
              </div>
            ) : (
              <div className="mt-6 flex flex-col items-center justify-center">
                <div className="h-[230px] w-full max-w-[360px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={52}
                        outerRadius={78}
                        paddingAngle={6}
                        cornerRadius={8}
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-center gap-6 text-[12px] text-[#64748b]">
                  {data.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <span
                        className="inline-block h-[7px] w-[7px] rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>
                        {item.name} ({item.value})
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid w-full max-w-[520px] grid-cols-3 gap-3">
                  <div className="rounded-md border border-[#e5e7eb] bg-[#f8fafc] px-4 py-4 text-center">
                    <h3 className="text-[20px] font-bold text-[#7c3aed]">
                      {textCount}
                    </h3>
                    <p className="mt-1 text-[12px] text-[#64748b]">Text</p>
                  </div>

                  <div className="rounded-md border border-[#e5e7eb] bg-[#f8fafc] px-4 py-4 text-center">
                    <h3 className="text-[20px] font-bold text-[#1f5a49]">
                      {callCount}
                    </h3>
                    <p className="mt-1 text-[12px] text-[#64748b]">Call</p>
                  </div>

                  <div className="rounded-md border border-[#e5e7eb] bg-[#f8fafc] px-4 py-4 text-center">
                    <h3 className="text-[20px] font-bold text-[#34a853]">
                      {videoCount}
                    </h3>
                    <p className="mt-1 text-[12px] text-[#64748b]">Video</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}