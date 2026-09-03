"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import GridBackdrop from "@/src/components/GridBackdrop";

const FEATURES = ["AI Communications", "Omnichannel Messaging", "Voice & SMS", "Secure by Design"];

export default function Home() {
  const router = useRouter();

  return (
    <main className="relative min-h-svh bg-eocean-navy">
      <GridBackdrop />

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-6xl flex-col px-5 sm:px-8">
        <header className="flex items-center justify-between py-6 sm:py-8">
          <Image
            src="/eocean-logo.jpg"
            alt="Eocean"
            width={150}
            height={50}
            className="h-8 w-auto object-contain sm:h-9"
            priority
          />
          <button
            onClick={() => router.push("/login")}
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:text-white active:scale-95"
          >
            Sign in
          </button>
        </header>

        <div className="flex flex-1 flex-col justify-center py-12 sm:py-16">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-eocean-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-eocean-cyan" />
            AI-Powered Communications
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Connect. Communicate.
            <br />
            <span className="text-eocean-cyan">Grow with Eocean.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
            Powerful communication solutions built for modern businesses — all
            in one intelligent platform.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={() => router.push("/login")}
              className="rounded-lg bg-eocean-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] sm:text-base"
            >
              Log in
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 active:scale-[0.98] sm:text-base"
            >
              Create account
            </button>
          </div>

          <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-3">
            {FEATURES.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-slate-300 sm:rounded-full sm:border sm:border-white/10 sm:px-3.5 sm:py-1.5"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0 text-eocean-cyan" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <p className="pb-8 text-xs text-slate-500 sm:text-sm">
          Intelligent communication. Built for businesses.
        </p>
      </div>
    </main>
  );
}