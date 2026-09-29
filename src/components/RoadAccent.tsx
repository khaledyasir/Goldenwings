export default function RoadAccent({
  tone = "gold",
  className = "",
}: {
  tone?: "gold" | "light";
  className?: string;
}) {
  const stroke = tone === "light" ? "#d9bf87" : "#c5a059";

  return (
    <svg
      viewBox="0 0 1200 500"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <path
        d="M -50 470 C 260 380, 380 300, 620 320 C 860 340, 950 190, 1260 100"
        fill="none"
        stroke={stroke}
        strokeWidth="46"
        opacity="0.1"
        strokeLinecap="round"
      />
      <path
        d="M -50 470 C 260 380, 380 300, 620 320 C 860 340, 950 190, 1260 100"
        fill="none"
        stroke={stroke}
        strokeWidth="3"
        strokeDasharray="16 18"
        opacity="0.5"
        strokeLinecap="round"
      />
      <circle cx="-50" cy="470" r="90" fill={stroke} opacity="0.08" />
      <circle cx="1260" cy="100" r="120" fill={stroke} opacity="0.08" />
    </svg>
  );
}
