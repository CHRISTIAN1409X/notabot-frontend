const statusMap = {
  review: "border-amber-300/30 bg-amber-300/10 text-amber-200",
  correction: "border-rose-300/30 bg-rose-300/10 text-rose-200",
  approved: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  received: "border-sky-300/30 bg-sky-300/10 text-sky-200",
  default: "border-line bg-ink/70 text-muted",
};

export default function StatusBadge({ status, statusKey }) {
  return (
    <span
      className={`mono-state inline-flex min-h-7 items-center border px-2.5 ${statusMap[statusKey] ?? statusMap.default}`}
      style={{ borderRadius: 8 }}
    >
      {status}
    </span>
  );
}
