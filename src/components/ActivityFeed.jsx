import Semaphore from "./Semaphore";

export default function ActivityFeed({ items }) {
  return (
    <section className="panel p-5">
      <div>
        <h2 className="text-lg font-extrabold text-copy">Actividad reciente</h2>
        <p className="text-sm text-muted">Trazabilidad de decisiones y validaciones</p>
      </div>

      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <article className="soft-panel p-4" key={`${item.title}-${item.time}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-copy">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{item.description}</p>
              </div>
              <Semaphore value={item.semaphore} compact />
            </div>
            <p className="mt-3 font-mono text-xs font-bold text-slate-500">{item.time}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
