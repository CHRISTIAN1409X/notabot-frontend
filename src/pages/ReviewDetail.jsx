import { CheckCircle2, ClipboardCheck, MessageSquareWarning, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PdfViewerMock from "../components/PdfViewerMock";
import ReviewAiPanel from "../components/ReviewAiPanel";
import {
  approveReview,
  fetchIaAnalysis,
  sendObservations,
} from "../services/api";
import { apiBaseUrl } from "../services/apiAxios";

function getSemaphore(score) {
  if (score >= 8) return "green";
  if (score >= 6) return "yellow";
  return "red";
}

function normalizeIaResponse(data) {
  const passed = data.criteriaResults.filter((c) => c.passed).length;
  const total = data.criteriaResults.length;

  return {
    id: data.uuid,
    pdfName: data.pdfName,
    pdfUrl: `${apiBaseUrl}/ia/${data.uuid}/pdf`,
    score: data.score,
    semaphore: getSemaphore(data.score),
    status: "Revisión coordinador",
    statusKey: "review",
    summary: `Análisis completado: ${passed} de ${total} criterios aprobados.`,
    criteriaResults: data.criteriaResults,
    timeline: [
      { label: "PDF recibido", time: "Completado", state: "complete" },
      { label: "Validación IA", time: "Completado", state: "complete" },
      { label: "Revisión coordinador", time: "Pendiente", state: "active" },
      { label: "Decisión académica", time: "Pendiente", state: "pending" },
    ],
  };
}

export default function ReviewDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [review, setReview] = useState(null);
  const [decision, setDecision] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    fetchIaAnalysis(id)
      .then((data) => {
        if (!data.criteriaResults || data.criteriaResults.length === 0) {
          setError("No se encontraron criterios de evaluación para este análisis.");
          return;
        }
        setReview(normalizeIaResponse(data));
      })
      .catch((err) => {
        setError(
          err.response?.status === 404
            ? "No se encontró el análisis solicitado."
            : "Error al cargar el análisis. Verifica que el UUID sea correcto e intenta de nuevo."
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  const runDecision = async (action) => {
    setIsSubmitting(true);

    try {
      const response =
        action === "approve"
          ? await approveReview(id)
          : await sendObservations(id);

      setDecision(response);
      setIsSubmitting(false);

      if (action === "approve") {
        setAlert({
          type: "success",
          title: "Planeador aprobado",
          message: "El documento ha sido aprobado y movido al historial académico.",
          action: "history",
        });
      } else {
        setAlert({
          type: "success",
          title: "Observaciones enviadas",
          message: response.message || "Correo enviado exitosamente al profesor.",
          action: "procesos",
        });
      }
    } catch (err) {
      setIsSubmitting(false);
      setAlert({
        type: "error",
        title: "Error",
        message: err.response?.status === 404
          ? "No se encontró el análisis solicitado."
          : "No se pudo completar la operación. Intente de nuevo.",
        action: null,
      });
    }
  };

  if (loading) {
    return (
      <div className="panel p-6 text-muted">
        Cargando detalle de revisión...
      </div>
    );
  }

  if (error) {
    return (
      <div className="panel p-6">
        <p className="mb-4 font-bold text-rose-300">{error}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!review) {
    return null;
  }

  return (
    <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_520px]">
      <PdfViewerMock review={review} />

      <ReviewAiPanel
        decision={decision}
        isSubmitting={isSubmitting}
        review={review}
        onApprove={() => runDecision("approve")}
        onSendObservations={() => runDecision("observations")}
      />

      {alert && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <div className="panel w-full max-w-md p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                {alert.type === "success" ? (
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-400/10 text-emerald-300">
                    <CheckCircle2 size={22} />
                  </div>
                ) : (
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-rose-400/10 text-rose-300">
                    <MessageSquareWarning size={22} />
                  </div>
                )}
                <div>
                  <h3 className="font-extrabold text-copy">{alert.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{alert.message}</p>
                </div>
              </div>
              <button
                className="shrink-0 text-muted transition hover:text-copy"
                type="button"
                onClick={() => setAlert(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                className="primary-button w-full"
                type="button"
                onClick={() => navigate(alert.action === "history" ? "/historial" : "/procesos")}
              >
                {alert.action === "history" ? "Ir a historial" : "Ir a procesos activos"}
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={() => setAlert(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}