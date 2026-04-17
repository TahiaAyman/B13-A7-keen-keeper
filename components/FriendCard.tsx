import Link from "next/link";

type Friend = {
  id: number;
  name: string;
  picture: string;
  email: string;
  days_since_contact: number;
  status: string;
  tags: string[];
  bio: string;
  goal: number;
  next_due_date: string;
};

const statusLabel: Record<string, string> = {
  overdue: "Overdue",
  "almost due": "Almost Due",
  "on-track": "On-Track",
};

const statusStyles: Record<string, string> = {
  overdue: "bg-[#ff5a5f] text-white",
  "almost due": "bg-[#f4b63d] text-white",
  "on-track": "bg-[#1f7a5c] text-white",
};

export default function FriendCard({ friend }: { friend: Friend }) {
  return (
    <Link href={`/friends/${friend.id}`} className="block">
      <div className="flex h-[150px] flex-col items-center rounded-[6px] border border-[#e7ebef] bg-white px-3 pt-3 pb-2 text-center shadow-[0_1px_3px_rgba(15,23,42,0.05)] transition hover:shadow-[0_2px_6px_rgba(15,23,42,0.08)]">
        <img
          src={friend.picture}
          alt={friend.name}
          className="h-[36px] w-[36px] rounded-full object-cover"
        />

        <h3 className="mt-2 text-[12px] font-semibold leading-none text-[#1f2937]">
          {friend.name}
        </h3>

        <p className="mt-1 text-[9px] leading-none text-[#9aa4b2]">
          {friend.days_since_contact}d ago
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-[4px]">
          {friend.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#dff5e8] px-[7px] py-[2px] text-[7px] font-medium uppercase tracking-[0.3px] text-[#3d8b68]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-3">
          <span
            className={`inline-block rounded-full px-[8px] py-[3px] text-[8px] font-semibold leading-none ${
              statusStyles[friend.status] || "bg-slate-400 text-white"
            }`}
          >
            {statusLabel[friend.status] || friend.status}
          </span>
        </div>
      </div>
    </Link>
  );
}