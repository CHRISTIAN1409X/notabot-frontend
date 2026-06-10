import { ArrowUpRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Semaphore from "./Semaphore";
import StatusBadge from "./StatusBadge";

export default function ProcessTable({ processes }) {
  return (
    <div className="panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[840px] border-collapse">
          <thead>
            <tr className="border-b border-line bg-ink/45 text-left text-xs font-bold text-muted">
              <th className="px-4 py-3">Proceso</th>
              <th className="px-4 py-3">Profesor</th>
              <th className="px-4 py-3">Materia</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Semaforo</th>
              <th className="px-4 py-3">Accion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70">
            {processes.map((process) => (
              <tr className="text-sm text-muted transition duration-200 hover:bg-panel/45" key={process.id}>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center bg-rose-400/10 text-rose-200" style={{ borderRadius: 8 }}>
                      <FileText size={18} />
                    </span>
                    <div>
                      <p className="font-mono text-xs font-bold text-copy">{process.id}</p>
                      <p className="max-w-[220px] truncate text-xs text-muted">{process.pdfName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 font-semibold text-copy">{process.professor}</td>
                <td className="px-4 py-4">{process.subject}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={process.status} statusKey={process.statusKey} />
                </td>
                <td className="px-4 py-4 font-mono text-sm font-bold text-copy">{process.score}</td>
                <td className="px-4 py-4">
                  <Semaphore value={process.semaphore} />
                </td>
                <td className="px-4 py-4">
                  <Link className="secondary-button min-h-9 px-3 text-xs" to={`/reviews/${process.id}`}>
                    Ver detalle
                    <ArrowUpRight size={15} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
