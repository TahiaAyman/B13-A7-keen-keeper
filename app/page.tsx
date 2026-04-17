import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import FriendCard from "@/components/FriendCard";
import SummaryCards from "@/components/SummaryCards";
import friends from "@/data/friends.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3f6f8]">
      <Banner />

      <SummaryCards friends={friends as any} />

      <section className="px-4 pb-10 pt-1">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-[16px] font-bold text-[#1f2937]">
            Your Friends
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}