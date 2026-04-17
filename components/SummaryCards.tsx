"use client";

type Friend = {
  id?: number;
  name?: string;
  picture?: string;
  status: string;
};

export default function SummaryCards({ friends }: { friends: Friend[] }) {
  const totalFriends = friends.length;

  const onTrack = friends.filter((f) => f.status === "on-track").length;

  const needAttention = friends.filter(
    (f) => f.status === "overdue" || f.status === "almost due"
  ).length;

  const interactions = 12;

  const cards = [
    { value: totalFriends, label: "Total Friends" },
    { value: onTrack, label: "On Track" },
    { value: needAttention, label: "Need Attention" },
    { value: interactions, label: "Interactions This Month" },
  ];

  return (
    <section className="px-4 pb-8">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-md border border-slate-200 bg-white px-4 py-6 text-center shadow-sm"
          >
            <h3 className="text-[34px] font-bold leading-none text-emerald-700">
              {card.value}
            </h3>
            <p className="mt-3 text-[12px] text-slate-400">{card.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}