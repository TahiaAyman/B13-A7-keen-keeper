"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Footer from "@/components/Footer";
import friends from "@/data/friends.json";
import { useTimeline } from "@/context/TimelineContext";
import {
  FaBell,
  FaBoxArchive,
  FaTrash,
  FaPhone,
  FaCommentDots,
  FaVideo,
} from "react-icons/fa6";

type Friend = {
  id: number;
  name: string;
  picture: string;
  email: string;
  days_since_contact: number;
  status: "overdue" | "almost due" | "on-track";
  tags: string[];
  bio: string;
  goal: number;
  next_due_date: string;
};

type ActionType = "call" | "text" | "video";

const statusStyles = {
  overdue: "bg-[#ff5a5f] text-white",
  "almost due": "bg-[#f4b63d] text-white",
  "on-track": "bg-[#1f7a5c] text-white",
};

const statusLabel = {
  overdue: "Overdue",
  "almost due": "Almost Due",
  "on-track": "On-Track",
};

export default function FriendDetailsPage() {
  const params = useParams();
  const { addEvent } = useTimeline();

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const friend = useMemo(() => {
    return (friends as Friend[]).find((item) => item.id === Number(params.id));
  }, [params.id]);

  useEffect(() => {
    if (!showToast) return;

    const timer = setTimeout(() => {
      setShowToast(false);
      setToastMessage("");
      setIsSubmitting(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [showToast]);

  if (!friend) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f3f6f8] px-4">
        <p className="text-center text-[16px] text-[#64748b]">Friend not found.</p>
      </main>
    );
  }

  const handleQuickCheckIn = (type: ActionType) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const today = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    addEvent({
      type,
      name: friend.name,
      date: today,
    });

    const label = type.charAt(0).toUpperCase() + type.slice(1);
    setToastMessage(`${label} is added on timeline`);
    setShowToast(true);
  };

  return (
    <main className="min-h-screen bg-[#f3f6f8]">
      <div className="sticky top-0 z-[9999] flex justify-center px-4 pt-4">
        {showToast && (
          <div className="rounded-md bg-[#1f5a49] px-5 py-3 text-[14px] font-medium text-white shadow-xl">
            {toastMessage}
          </div>
        )}
      </div>

      <section className="px-4 py-8 sm:py-10 md:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* LEFT SIDE */}
            <div className="w-full lg:w-[260px] lg:shrink-0">
              <div className="rounded-md border border-[#e5e7eb] bg-white px-5 py-6 text-center shadow-sm sm:px-6">
                <img
                  src={friend.picture}
                  alt={friend.name}
                  className="mx-auto h-[74px] w-[74px] rounded-full object-cover"
                />

                <h1 className="mt-4 text-[16px] font-bold text-[#1f2937] sm:text-[18px]">
                  {friend.name}
                </h1>

                <div className="mt-3">
                  <span
                    className={`inline-block rounded-full px-3 py-[4px] text-[10px] font-semibold ${statusStyles[friend.status]}`}
                  >
                    {statusLabel[friend.status]}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
                  {friend.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#dff5e8] px-2 py-[3px] text-[8px] font-semibold uppercase tracking-wide text-[#3d8b68]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-[13px] italic leading-6 text-[#64748b]">
                  “{friend.bio}”
                </p>

                <p className="mt-3 text-[12px] text-[#94a3b8]">
                  Preferred: email
                </p>
              </div>

              <div className="mt-3 space-y-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-[#e5e7eb] bg-white py-3 text-[14px] text-[#1f2937] shadow-sm"
                >
                  <FaBell className="text-[13px]" />
                  Snooze 2 Weeks
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-[#e5e7eb] bg-white py-3 text-[14px] text-[#1f2937] shadow-sm"
                >
                  <FaBoxArchive className="text-[13px]" />
                  Archive
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-[#e5e7eb] bg-white py-3 text-[14px] text-[#ef4444] shadow-sm"
                >
                  <FaTrash className="text-[13px]" />
                  Delete
                </button>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 space-y-4">
              {/* TOP STATS */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-md border border-[#e5e7eb] bg-white px-5 py-6 text-center shadow-sm">
                  <h3 className="text-[18px] font-bold text-[#2f5d50] sm:text-[20px]">
                    {friend.days_since_contact}
                  </h3>
                  <p className="mt-2 text-[13px] text-[#64748b]">
                    Days Since Contact
                  </p>
                </div>

                <div className="rounded-md border border-[#e5e7eb] bg-white px-5 py-6 text-center shadow-sm">
                  <h3 className="text-[18px] font-bold text-[#2f5d50] sm:text-[20px]">
                    {friend.goal}
                  </h3>
                  <p className="mt-2 text-[13px] text-[#64748b]">Goal (Days)</p>
                </div>

                <div className="rounded-md border border-[#e5e7eb] bg-white px-5 py-6 text-center shadow-sm sm:col-span-2 xl:col-span-1">
                  <h3 className="text-[18px] font-bold text-[#2f5d50] sm:text-[20px]">
                    {new Date(friend.next_due_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h3>
                  <p className="mt-2 text-[13px] text-[#64748b]">Next Due</p>
                </div>
              </div>

              {/* RELATIONSHIP GOAL */}
              <div className="rounded-md border border-[#e5e7eb] bg-white px-4 py-5 shadow-sm sm:px-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-[16px] font-semibold text-[#2f5d50]">
                      Relationship Goal
                    </h2>

                    <p className="mt-4 text-[15px] leading-7 text-[#64748b]">
                      Connect every{" "}
                      <span className="font-bold text-[#1f2937]">
                        {friend.goal} days
                      </span>
                    </p>
                  </div>

                  <button
                    type="button"
                    className="self-start rounded border border-[#e5e7eb] bg-[#f8fafc] px-4 py-2 text-[12px] font-medium text-[#1f2937]"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* QUICK CHECK-IN */}
              <div className="rounded-md border border-[#e5e7eb] bg-white px-4 py-5 shadow-sm sm:px-5">
                <h2 className="text-[16px] font-semibold text-[#2f5d50]">
                  Quick Check-In
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => handleQuickCheckIn("call")}
                    disabled={isSubmitting}
                    className="flex min-h-[120px] flex-col items-center justify-center rounded-md border border-[#e5e7eb] bg-[#f8fafc] py-6 text-[#1f2937] transition hover:bg-[#eef6f2] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <FaPhone className="text-[22px]" />
                    <span className="mt-3 text-[14px]">Call</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickCheckIn("text")}
                    disabled={isSubmitting}
                    className="flex min-h-[120px] flex-col items-center justify-center rounded-md border border-[#e5e7eb] bg-[#f8fafc] py-6 text-[#1f2937] transition hover:bg-[#eef6f2] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <FaCommentDots className="text-[22px]" />
                    <span className="mt-3 text-[14px]">Text</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickCheckIn("video")}
                    disabled={isSubmitting}
                    className="flex min-h-[120px] flex-col items-center justify-center rounded-md border border-[#e5e7eb] bg-[#f8fafc] py-6 text-[#1f2937] transition hover:bg-[#eef6f2] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <FaVideo className="text-[22px]" />
                    <span className="mt-3 text-[14px]">Video</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}