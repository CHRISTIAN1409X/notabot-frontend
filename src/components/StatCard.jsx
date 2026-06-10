export default function StatCard({ label, value, delta, icon: Icon, tone = "indigo" }) {
  const toneMap = {
    indigo: "bg-accent/15 text-indigo-200 border-accent/30",
    amber: "bg-amber-300/10 text-amber-200 border-amber-300/30",
    emerald: "bg-emerald-300/10 text-emerald-200 border-emerald-300/30",
    rose: "bg-rose-300/10 text-rose-200 border-rose-300/30",
  };

  return (
    <article className="panel p-5 animate-floatIn">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">{label}</p>
          <strong className="mt-3 block font-mono text-4xl text-copy">{value}</strong>
        </div>
        <span className={`grid h-11 w-11 place-items-center border ${toneMap[tone]}`} style={{ borderRadius: 8 }}>
          <Icon size={20} />
        </span>
      </div>
      <p className="mt-4 font-mono text-xs font-bold text-slate-400">{delta}</p>
    </article>
  );
}
