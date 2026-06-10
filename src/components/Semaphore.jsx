const toneMap = {
  green: {
    dot: "bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.65)]",
    text: "text-emerald-300",
    label: "Verde",
  },
  yellow: {
    dot: "bg-amber-300 shadow-[0_0_18px_rgba(252,211,77,0.65)]",
    text: "text-amber-300",
    label: "Amarillo",
  },
  red: {
    dot: "bg-rose-400 shadow-[0_0_18px_rgba(251,113,133,0.65)]",
    text: "text-rose-300",
    label: "Rojo",
  },
};

export default function Semaphore({ value = "green", compact = false }) {
  const tone = toneMap[value] ?? toneMap.green;

  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${tone.dot}`} />
      {!compact && <span className={`mono-state ${tone.text}`}>{tone.label}</span>}
    </span>
  );
}
