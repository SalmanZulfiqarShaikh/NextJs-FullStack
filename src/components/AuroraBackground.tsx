/**
 * Decorative full-bleed backdrop for the Eocean navy theme.
 *
 * Render it as the first child of a `relative overflow-hidden` element and put
 * page content in a `relative z-10` wrapper above it.
 */
export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* soft radial glow behind the hero */}
      <div className="absolute left-1/2 top-[-8rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-eocean-blue/15 blur-3xl" />

      {/* corner orbs */}
      <div className="absolute -left-32 -top-24 h-96 w-96 rounded-full bg-eocean-blue/25 blur-3xl" />
      <div
        className="absolute -bottom-28 -right-32 h-[26rem] w-[26rem] rounded-full bg-eocean-cyan/15 blur-3xl"
      />
      <div className="absolute bottom-1/4 left-[-10rem] h-72 w-72 rounded-full bg-eocean-cyan/10 blur-3xl" />

      {/* subtle bottom vignette grounds the page */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-eocean-navy/80 to-transparent" />
    </div>
  );
}
