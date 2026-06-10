import { useEffect, useState } from "react";
import ProcessTable from "../components/ProcessTable";
import { fetchProcesses } from "../services/api";

export default function HistoryPage() {
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    fetchProcesses("history").then(setProcesses);
  }, []);

  return (
    <div className="mx-auto grid max-w-7xl gap-5">
      <section className="panel p-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-copy">Historial academico</h2>
            <p className="mt-1 text-sm text-muted">Planeadores aprobados con trazabilidad institucional.</p>
          </div>
          <span className="font-mono text-xs font-bold text-muted">EXPORT READY</span>
        </div>
      </section>
      <ProcessTable processes={processes} />
    </div>
  );
}
