"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaHome, FaRegClock, FaChartBar } from "react-icons/fa";

import logo from "../assets/logo.png"; // ✅ FIXED

const links = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "Timeline", href: "/timeline", icon: FaRegClock },
  { name: "Stats", href: "/stats", icon: FaChartBar },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="KeenKeeper Logo"
            width={120}
            height={35}
            className="object-contain"
            unoptimized
          />
        </Link>

        <div className="flex items-center gap-3 text-[11px]">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-1 rounded-md px-3 py-1.5 font-medium transition ${
                  active
                    ? "bg-[#1f5a49] text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                }`}
              >
                <Icon className="text-[10px]" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}