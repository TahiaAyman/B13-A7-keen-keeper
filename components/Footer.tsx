import Image from "next/image";

import facebookIcon from "../assets/facebook.png";
import twitterIcon from "../assets/twitter.png";
import instagramIcon from "../assets/instagram.png";
import logo from "../assets/logo-xl.png";

export default function Footer() {
  return (
    <footer className="mt-0 bg-[#1f5a49] px-4 pt-14 pb-6 text-white">
      <div className="mx-auto max-w-5xl text-center">
        <div className="flex justify-center">
          <Image
            src={logo}
            alt="KeenKeeper Logo"
            width={260}
            height={80}
            className="object-contain"
            unoptimized
          />
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-[11px] text-emerald-50/80">
          Your personal shelf of meaningful connections. Browse, tend and nurture
          the relationships that matter most.
        </p>

        <p className="mt-7 text-[12px] font-semibold">Social Links</p>

        <div className="mt-4 flex justify-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <Image
              src={instagramIcon}
              alt="Instagram"
              width={18}
              height={18}
              className="object-contain"
              unoptimized
            />
          </span>

          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <Image
              src={facebookIcon}
              alt="Facebook"
              width={18}
              height={18}
              className="object-contain"
              unoptimized
            />
          </span>

          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <Image
              src={twitterIcon}
              alt="Twitter"
              width={18}
              height={18}
              className="object-contain"
              unoptimized
            />
          </span>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[10px] text-emerald-50/70 md:flex-row">
          <p>© 2026 KeenKeeper. All rights reserved.</p>

          <div className="flex gap-5">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}