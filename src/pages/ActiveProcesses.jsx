import { useEffect, useState } from "react";
import ProcessTable from "../components/ProcessTable";
import { fetchProcesses } from "../services/api";

export default function ActiveProcesses() {
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    fetchProcesses("active").then(setProcesses);
  }, []);

  const review = processes.filter((p) => p.statusKey === "review");
  const correction = processes.filter((p) => p.statusKey === "correction");
  const avgScore = processes.length
    ? Math.round(processes.reduce((s, p) => s + (p.score || 0), 0) / processes.length)
    : 0;

  return (
    <div className="mx-auto grid max-w-7xl gap-5">
      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["En revisión", review.length],
          ["Pendiente corrección", correction.length],
          ["Score promedio", avgScore],
        ].map(([label, value]) => (
          <article className="panel p-5" key={label}>
            <p className="text-sm font-medium text-muted">{label}</p>
            <strong className="mt-3 block font-mono text-4xl text-copy">{value}</strong>
          </article>
        ))}
      </section>
      <ProcessTable processes={processes} />
    </div>
  );
}
