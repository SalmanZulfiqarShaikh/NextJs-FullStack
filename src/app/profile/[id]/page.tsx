"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import AuroraBackground from "@/src/components/AuroraBackground";

type Feature = {
  tag: string;
  title: string;
  copy: string;
};

const FEATURES: Feature[] = [
  {
    tag: "AI",
    title: "AI Communications",
    copy: "Intelligent communication solutions for modern businesses.",
  },
  {
    tag: "MSG",
    title: "Messaging",
    copy: "Connect with customers through powerful communication channels.",
  },
  {
    tag: "VOX",
    title: "Voice & More",
    copy: "Explore voice, email, SMS and other communication solutions.",
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const username = searchParams.get("name") || "User";
  const initial = username.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
      });

      toast.success("Logged out successfully");
      router.push("/login");
    } catch {
      toast.error("Unable to log out");
    }
  };

  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden bg-eocean-navy">
      <AuroraBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-8 sm:px-8 sm:py-10">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <Image
            src="/eocean-logo.jpg"
            alt="Eocean"
            width={150}
            height={50}
            className="h-auto w-28 object-contain sm:w-32"
            priority
          />

          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Signed in
            </span>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M15 12H3m0 0 3.5-3.5M3 12l3.5 3.5M12 3h6a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-6" />
              </svg>
              <span className="hidden min-[400px]:inline">Log out</span>
            </button>
          </div>
        </header>

        <div className="flex flex-1 flex-col justify-center py-8 sm:py-12">
          {/* Greeting */}
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8 lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-eocean-blue/25 blur-3xl"
            />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-widest text-eocean-cyan">
                  Dashboard
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Welcome,{" "}
                  <span className="break-words bg-linear-to-r from-eocean-cyan via-sky-300 to-eocean-blue bg-clip-text pb-1 text-transparent">
                    {username}
                  </span>
                </h1>

                <p className="mt-3 max-w-xl text-slate-300">
                  Your Eocean communication workspace is ready.
                </p>
              </div>

              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center self-start rounded-2xl bg-linear-to-br from-eocean-blue to-eocean-cyan text-2xl font-bold text-white shadow-lg shadow-eocean-blue/30 ring-1 ring-inset ring-white/20 sm:h-20 sm:w-20 sm:self-center sm:text-3xl"
                aria-hidden="true"
              >
                {initial}
              </div>
            </div>
          </section>

          {/* Feature grid */}
          <section className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <article
                key={feature.tag}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-eocean-blue/50 to-eocean-cyan/10 text-xs font-bold tracking-wide text-eocean-cyan ring-1 ring-inset ring-white/10">
                  {feature.tag}
                </div>

                <h2 className="mt-4 font-semibold text-white">
                  {feature.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {feature.copy}
                </p>
              </article>
            ))}
          </section>
        </div>

        <p className="mt-2 text-center text-xs text-slate-500 sm:text-sm">
          Eocean — AI-powered communications
        </p>
      </div>
    </main>
  );
}
