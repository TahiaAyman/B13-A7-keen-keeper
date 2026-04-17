import { FaPlus } from "react-icons/fa";

export default function Banner() {
  return (
    <section className="px-4 pt-10 pb-8">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">
          Friends to keep close in your life
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-[11px] leading-5 text-slate-400">
          Your personal shelf of meaningful connections. Browse, tend, and nurture
          the relationships that matter most.
        </p>

        <button className="mt-5 inline-flex items-center gap-2 rounded bg-emerald-800 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-900">
          <FaPlus className="text-[10px]" />
          Add a Friend
        </button>
      </div>
    </section>
  );
}