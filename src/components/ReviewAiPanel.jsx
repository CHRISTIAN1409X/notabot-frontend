import { CheckCircle2, ClipboardCheck, MessageSquareWarning, Send, XCircle } from "lucide-react";
import Semaphore from "./Semaphore";
import StatusBadge from "./StatusBadge";

const scoreColor = {
  green: "#34d399",
  yellow: "#fbbf24",
  red: "#fb7185",
};

function CriterionCard({ criterion, passed, observation, score: criterionScore }) {
  return (
    <div
      className={`border-l-4 p-4 ${passed ? "border-l-emerald-400" : "border-l-rose-400"}`}
      style={{ borderRadius: 8 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          {passed ? (
            <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-400" size={18} />
          ) : (
            <XCircle className="mt-0.5 shrink-0 text-rose-400" size={18} />
          )}
          <span className="font-bold text-copy">{criterion}</span>
        </div>
        <span
          className={`mono-state shrink-0 border px-2 py-0.5 text-xs font-bold ${
            passed
              ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-200"
              : "border-rose-300/30 bg-rose-300/10 text-rose-200"
          }`}
          style={{ borderRadius: 6 }}
        >
          {criterionScore}/10
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted">{observation}</p>
    </div>
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
            <h2 className="mt-2 text-xl font-extrabold text-copy">Resultado de revisión</h2>
          </div>
          <StatusBadge status={decision?.status ?? review.status} statusKey={decision?.statusKey ?? review.statusKey} />
        </div>

        <div className="mt-6 flex items-center gap-5">
          <div
            className="grid h-28 w-28 place-items-center"
            style={{
              borderRadius: 8,
              background: `conic-gradient(${arcColor} ${review.score * 36}deg, rgba(51,65,85,0.9) 0deg)`,
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

      {review.criteriaResults && review.criteriaResults.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-extrabold text-copy">Criterios evaluados</h3>
          <div className="grid gap-2">
            {review.criteriaResults.map((cr) => (
              <CriterionCard
                key={cr.criterion}
                criterion={cr.criterion}
                passed={cr.passed}
                observation={cr.observation}
                score={cr.score}
              />
            ))}
          </div>
        </section>
      )}

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
                : "El proceso queda pendiente de corrección por parte del profesor."}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
