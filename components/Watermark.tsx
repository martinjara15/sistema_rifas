export default function Watermark() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-[-50%] flex flex-wrap gap-24 justify-center items-center"
        style={{ transform: "rotate(-30deg)" }}
      >
        {Array.from({ length: 80 }).map((_, i) => (
          <span
            key={i}
            className="text-white/[0.04] text-5xl font-extrabold whitespace-nowrap"
          >
            DEMO
          </span>
        ))}
      </div>
    </div>
  );
}
