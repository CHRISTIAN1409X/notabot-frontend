import { useEffect, useState } from "react";
import ProcessTable from "../components/ProcessTable";
import { fetchProcesses } from "../services/api";

export default function ActiveProcesses() {
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    fetchProcesses("active").then(setProcesses);
  }, []);

  return (
    <div className="mx-auto grid max-w-7xl gap-5">
      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["En revisión", "1"],
          ["Pendiente corrección", "2"],
          ["Score promedio", "70"],
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
