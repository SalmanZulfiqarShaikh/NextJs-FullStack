import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import AuroraBackground from "./AuroraBackground";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** Heading shown on the brand panel (desktop only). */
  panelTitle: string;
  /** Short blurb shown on the brand panel (desktop only). */
  panelCopy: string;
  /** Form fields + submit + footer link. Rendered inside the white card. */
  children: ReactNode;
};

/**
 * Shared shell for /login and /signup.
 *
 * Responsive strategy:
 * - Small screens: a single centered white card on the navy aurora backdrop.
 * - `lg` and up: a two-column split card — brand panel on the left, form on
 *   the right — so the page uses the wider desktop viewport instead of staying
 *   a narrow centered column.
 */
export default function AuthShell({
  eyebrow,
  title,
  description,
  panelTitle,
  panelCopy,
  children,
}: AuthShellProps) {
  return (
    <main className="relative flex min-h-svh items-center overflow-hidden bg-eocean-navy px-4 py-10 sm:px-6 sm:py-12">
      <AuroraBackground />

      <div className="relative z-10 mx-auto w-full max-w-md lg:max-w-4xl">
        {/* Brand lockup — shown above the card below lg, inside the panel at lg */}
        <div className="mb-8 flex justify-center lg:hidden">
          <Image
            src="/eocean-logo.jpg"
            alt="Eocean"
            width={180}
            height={60}
            className="h-auto w-36 object-contain sm:w-40"
            priority
          />
        </div>

        <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-2xl shadow-eocean-navy/40 lg:grid lg:grid-cols-[1fr_1.25fr]">
          {/* Brand panel — decorative, hidden on small screens */}
          <aside className="relative hidden overflow-hidden bg-eocean-navy p-10 lg:flex lg:flex-col lg:justify-between">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-eocean-blue/30 blur-3xl" />
              <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-eocean-cyan/20 blur-3xl" />
            </div>

            <div className="relative z-10">
              <Image
                src="/eocean-logo.jpg"
                alt="Eocean"
                width={180}
                height={60}
                className="h-auto w-40 object-contain"
              />
            </div>

            <div className="relative z-10 my-10 space-y-6">
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white">
                {panelTitle}
              </h2>
              <p className="text-sm leading-6 text-slate-300">{panelCopy}</p>

              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  Intelligent messaging across every channel
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  AI-powered assistance built for teams
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  Secure, scalable and always available
                </li>
              </ul>
            </div>

            <p className="relative z-10 text-xs text-slate-500">
              Eocean — AI-powered communications
            </p>
          </aside>

          {/* Form column */}
          <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-eocean-blue">
                {eyebrow}
              </p>

              <h1 className="mt-2 text-2xl font-bold tracking-tight text-eocean-navy sm:text-3xl">
                {title}
              </h1>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                {description}
              </p>
            </div>

            {children}
          </div>
        </div>

        <Link
          href="/"
          className="mt-6 block w-full text-center text-sm text-slate-400 transition hover:text-white"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 h-4 w-4 shrink-0 text-eocean-cyan"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
