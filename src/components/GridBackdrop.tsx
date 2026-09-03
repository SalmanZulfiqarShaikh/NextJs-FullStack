export default function GridBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-eocean-blue/20 blur-[100px]" />

      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-eocean-navy to-transparent" />
    </div>
  );
}