export default function Pipeline({ stages }) {
  const total = stages.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <section className="panel p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-copy">Pipeline de revisión</h2>
          <p className="text-sm text-muted">Estado operacional de planeadores académicos</p>
        </div>
        <span className="mono-state text-muted">{total} procesos activos</span>
      </div>

      <div className="mt-6 grid gap-4">
        {stages.map((stage) => {
          const width = Math.max(8, Math.round((stage.count / total) * 100));

          return (
            <div key={stage.label}>
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-copy">{stage.label}</span>
                <span className="font-mono text-xs font-bold text-muted">{stage.count}</span>
              </div>
              <div className="h-2 overflow-hidden bg-ink/70" style={{ borderRadius: 8 }}>
                <div className={`h-full ${stage.color}`} style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
