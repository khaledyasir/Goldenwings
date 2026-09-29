export default function RoadPath({ className = "" }: { className?: string }) {
  const d = "M120,0 C50,110 50,190 120,300 C190,410 190,490 120,600 C50,710 50,790 120,1000";

  return (
    <svg
      viewBox="0 0 240 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <path d={d} fill="none" stroke="#c5a059" strokeWidth="34" opacity="0.12" strokeLinecap="round" />
      <path
        d={d}
        fill="none"
        stroke="#c5a059"
        strokeWidth="3"
        strokeDasharray="14 16"
        opacity="0.55"
        strokeLinecap="round"
      />
    </svg>
  );
}
