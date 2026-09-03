"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import AuroraBackground from "@/src/components/AuroraBackground";

const FEATURES = [
  "AI Communications",
  "Omnichannel Messaging",
  "Voice & SMS",
  "Secure by Design",
];

export default function Home() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden bg-eocean-navy">
      <AuroraBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-8 sm:px-8 sm:py-10">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-4">
          <Image
            src="/eocean-logo.jpg"
            alt="Eocean"
            width={180}
            height={60}
            className="h-auto w-36 object-contain sm:w-44"
            priority
          />

          <button
            onClick={() => router.push("/login")}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur transition hover:bg-white/10 hover:text-white active:scale-95 sm:px-5"
          >
            Sign in
          </button>
        </header>

        {/* Hero */}
        <div className="flex flex-1 flex-col items-center justify-center py-12 sm:py-16">
          <section className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] px-6 py-14 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
              <div className="absolute -top-20 left-1/2 h-48 w-[26rem] -translate-x-1/2 rounded-full bg-eocean-cyan/20 blur-3xl" />
              <div className="absolute -right-24 top-1/3 h-48 w-48 rounded-full bg-eocean-blue/25 blur-3xl" />
            </div>

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-eocean-cyan sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-eocean-cyan" />
                AI-Powered Communications
              </span>

              <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Connect. Communicate.
                <span className="mt-1 block bg-linear-to-r from-eocean-cyan via-sky-300 to-eocean-blue bg-clip-text pb-1 text-transparent">
                  Grow with Eocean.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Experience powerful communication solutions built for modern
                businesses — all in one intelligent platform.
              </p>

              <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
                <button
                  onClick={() => router.push("/login")}
                  className="rounded-xl bg-eocean-blue bg-linear-to-b from-blue-500 to-eocean-blue px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_-18px_rgba(11,94,215,0.95)] transition hover:brightness-110 active:scale-[0.98] sm:text-base"
                >
                  Log in
                </button>

                <button
                  onClick={() => router.push("/signup")}
                  className="rounded-xl border border-white/15 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 active:scale-[0.98] sm:text-base"
                >
                  Create Account
                </button>
              </div>

              <ul className="mt-12 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                {FEATURES.map((feature) => (
                  <li
                    key={feature}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-200 sm:text-sm"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3 text-eocean-cyan"
                      aria-hidden="true"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <p className="mt-6 text-center text-xs text-slate-500 sm:text-sm">
            Intelligent communication. Built for businesses.
          </p>
        </div>
      </div>
    </main>
  );
}
