import { CheckCircle2, ClipboardCheck, MessageSquareWarning, Send } from "lucide-react";
import Semaphore from "./Semaphore";
import StatusBadge from "./StatusBadge";

const scoreColor = {
  green: "#34d399",
  yellow: "#fbbf24",
  red: "#fb7185",
};

function Checklist({ title, items, tone }) {
  const toneMap = {
    red: "border-rose-300/25 bg-rose-300/10 text-rose-200",
    yellow: "border-amber-300/25 bg-amber-300/10 text-amber-200",
    indigo: "border-indigo-300/25 bg-indigo-300/10 text-indigo-200",
  };

  return (
    <section>
      <h3 className="mb-3 text-sm font-extrabold text-copy">{title}</h3>
      <div className="grid gap-2">
        {items.map((item) => (
          <div className={`border p-3 text-sm leading-6 ${toneMap[tone]}`} style={{ borderRadius: 8 }} key={item}>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ReviewAiPanel({ review, decision, isSubmitting, onApprove, onSendObservations }) {
  const arcColor = scoreColor[review.semaphore] ?? scoreColor.green;

  return (
    <aside className="grid gap-4">
      <section className="panel p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-bold text-indigo-200">IA DOCUMENTAL</p>
            <h2 className="mt-2 text-xl font-extrabold text-copy">Resultado de revision</h2>
          </div>
          <StatusBadge status={decision?.status ?? review.status} statusKey={decision?.statusKey ?? review.statusKey} />
        </div>

        <div className="mt-6 flex items-center gap-5">
          <div
            className="grid h-28 w-28 place-items-center"
            style={{
              borderRadius: 8,
              background: `conic-gradient(${arcColor} ${review.score * 3.6}deg, rgba(51,65,85,0.9) 0deg)`,
            }}
          >
            <div className="grid h-[84px] w-[84px] place-items-center bg-panel" style={{ borderRadius: 8 }}>
              <strong className="font-mono text-3xl text-copy">{review.score}</strong>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted">Score del documento</p>
            <div className="mt-2">
              <Semaphore value={review.semaphore} />
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{review.summary}</p>
          </div>
        </div>
      </section>

      <Checklist title="Errores detectados" items={review.errorsList} tone="red" />
      <Checklist title="Anotaciones" items={review.annotationsList} tone="indigo" />
      <Checklist title="Recomendaciones" items={review.recommendationsList} tone="yellow" />

      <section className="panel p-5">
        <h3 className="text-sm font-extrabold text-copy">Timeline del proceso</h3>
        <div className="mt-4 grid gap-3">
          {review.timeline.map((step) => (
            <div className="grid grid-cols-[14px_1fr_auto] items-center gap-3" key={step.label}>
              <span
                className={`h-3.5 w-3.5 rounded-full ${
                  step.state === "complete"
                    ? "bg-emerald-400"
                    : step.state === "active"
                      ? "bg-amber-300"
                      : "bg-slate-600"
                }`}
              />
              <span className="text-sm font-bold text-copy">{step.label}</span>
              <span className="font-mono text-xs font-bold text-muted">{step.time}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <button className="primary-button" type="button" disabled={isSubmitting} onClick={onApprove}>
          <CheckCircle2 size={18} />
          Aprobar
        </button>
        <button className="secondary-button" type="button" disabled={isSubmitting} onClick={onSendObservations}>
          <Send size={18} />
          Enviar observaciones
        </button>
      </section>

      {decision && (
        <div className="soft-panel flex items-start gap-3 p-4">
          {decision.statusKey === "approved" ? (
            <ClipboardCheck className="mt-0.5 text-emerald-300" size={20} />
          ) : (
            <MessageSquareWarning className="mt-0.5 text-amber-300" size={20} />
          )}
          <div>
            <p className="font-bold text-copy">{decision.status}</p>
            <p className="mt-1 text-sm leading-6 text-muted">
              {decision.statusKey === "approved"
                ? "El documento pasa al historial y actualiza el dashboard."
                : "El proceso queda pendiente de correccion por parte del profesor."}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
