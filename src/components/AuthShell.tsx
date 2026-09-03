import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import GridBackdrop from "./GridBackdrop";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  panelTitle: string;
  panelCopy: string;
  children: ReactNode;
};

export default function AuthShell({
  eyebrow,
  title,
  description,
  panelTitle,
  panelCopy,
  children,
}: AuthShellProps) {
  return (
    <main className="relative min-h-svh bg-eocean-navy">
      <GridBackdrop />

      {/* Mobile / tablet top bar */}
      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8 lg:hidden">
        <Image
          src="/eocean-logo.jpg"
          alt="Eocean"
          width={140}
          height={46}
          className="h-8 w-auto object-contain"
          priority
        />
        <Link
          href="/"
          className="text-sm font-medium text-slate-400 transition hover:text-white"
        >
          Back to home
        </Link>
      </header>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 lg:min-h-svh lg:grid-cols-2">
        {/* Brand panel — desktop only */}
        <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 px-12 py-12 lg:flex xl:px-16">
          <Link href="/" className="inline-flex w-fit">
            <Image
              src="/eocean-logo.jpg"
              alt="Eocean"
              width={150}
              height={50}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          <div className="max-w-md">
            <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight text-white xl:text-4xl">
              {panelTitle}
            </h2>
            <p className="mt-4 text-[15px] leading-6 text-slate-400">
              {panelCopy}
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Intelligent messaging across every channel",
                "AI-powered assistance built for teams",
                "Secure, scalable, always available",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-eocean-cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-slate-500">
            Eocean — AI-powered communications
          </p>
        </aside>

        {/* Form column */}
        <div className="flex flex-1 items-center justify-center px-5 pb-12 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-sm">
            <div className="rounded-2xl border border-white/10 bg-eocean-surface p-6 shadow-2xl shadow-black/30 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eocean-blue">
                {eyebrow}
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-eocean-navy sm:text-[1.75rem]">
                {title}
              </h1>
              <p className="mt-2 text-sm text-slate-500">{description}</p>

              <div className="mt-7">{children}</div>
            </div>

            <Link
              href="/"
              className="mt-6 hidden w-full text-center text-sm text-slate-400 transition hover:text-white lg:block"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}