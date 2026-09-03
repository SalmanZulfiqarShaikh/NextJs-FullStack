"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import GridBackdrop from "@/src/components/GridBackdrop";

type Feature = { tag: string; title: string; copy: string };

const FEATURES: Feature[] = [
  { tag: "AI", title: "AI Communications", copy: "Intelligent communication solutions for modern businesses." },
  { tag: "MSG", title: "Messaging", copy: "Connect with customers through powerful communication channels." },
  { tag: "VOX", title: "Voice & More", copy: "Explore voice, email, SMS and other communication solutions." },
];

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("name") || "User";
  const initial = username.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      await fetch("/api/users/logout", { method: "POST", credentials: "include" });
      toast.success("Logged out successfully");
      router.push("/login");
    } catch {
      toast.error("Unable to log out");
    }
  };

  return (
    <main className="relative min-h-svh bg-eocean-navy">
      <GridBackdrop />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-5 py-6 sm:px-8 sm:py-8">
        <header className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
          <Image
            src="/eocean-logo.jpg"
            alt="Eocean"
            width={140}
            height={46}
            className="h-7 w-auto object-contain sm:h-8"
            priority
          />

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 text-xs font-medium text-slate-400 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Signed in
            </span>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3.5 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5 active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M15 12H3m0 0 3.5-3.5M3 12l3.5 3.5M12 3h6a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-6" />
              </svg>
              <span className="hidden min-[400px]:inline">Log out</span>
            </button>
          </div>
        </header>

        <section className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eocean-cyan">Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Welcome, <span className="break-words text-eocean-cyan">{username}</span>
            </h1>
            <p className="mt-2 max-w-xl text-slate-400">Your Eocean communication workspace is ready.</p>
          </div>

          <div className="flex h-16 w-16 shrink-0 items-center justify-center self-start rounded-xl bg-eocean-blue text-2xl font-bold text-white sm:h-20 sm:w-20 sm:self-center sm:text-3xl">
            {initial}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <article
              key={feature.tag}
              className="rounded-xl border border-white/10 p-5 transition hover:border-white/25 hover:bg-white/[0.03]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-xs font-bold tracking-wide text-eocean-cyan">
                {feature.tag}
              </div>
              <h2 className="mt-4 font-semibold text-white">{feature.title}</h2>
              <p className="mt-1.5 text-sm leading-6 text-slate-400">{feature.copy}</p>
            </article>
          ))}
        </section>

        <p className="mt-auto pb-2 text-center text-xs text-slate-500">
          Eocean — AI-powered communications
        </p>
      </div>
    </main>
  );
}