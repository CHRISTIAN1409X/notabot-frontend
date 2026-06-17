import { ArrowRight, Bot, FileText } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PdfDropzone from "../components/PdfDropzone";
import Semaphore from "../components/Semaphore";
import { professors, subjects } from "../data/mockData";
import { createReviewProcess } from "../services/api";

const initialForm = {
  coordinator: "Camila Torres",
  professor: professors[0],
  subject: subjects[0],
  program: "Ingeniería de Sistemas",
  period: "2026-A",
};

export default function NewProcess() {
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Selecciona un PDF antes de iniciar la validación.");
      return;
    }

    setError("");
    setResult(null);
    setIsSubmitting(true);
    const pdfUrl = URL.createObjectURL(file);
    const response = await createReviewProcess({
      ...form,
      file,
      pdfUrl,
    });
    setResult(response);
    setIsSubmitting(false);
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1fr_420px]">
      <section className="panel p-5 sm:p-6">
        <div className="mb-6 flex items-start gap-4">
          <span className="grid h-12 w-12 place-items-center border border-indigo-300/30 bg-indigo-300/10 text-indigo-200" style={{ borderRadius: 8 }}>
            <FileText size={23} />
          </span>
          <div>
            <h2 className="text-xl font-extrabold text-copy">Crear proceso de revisión</h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              Registra los datos académicos, adjunta el planeador PDF y simula el envío al backend.
            </p>
          </div>
        </div>



        <div className="mt-6">
          <PdfDropzone file={file} onFile={setFile} />
        </div>

        {error && <p className="mt-4 text-sm font-bold text-rose-300">{error}</p>}

        <button className="primary-button mt-6 w-full sm:w-auto" type="button" disabled={isSubmitting} onClick={handleSubmit}>
          <Bot size={18} />
          {isSubmitting ? "Validando PDF..." : "Iniciar validación"}
        </button>
      </section>

      <aside className="grid content-start gap-4">
        <section className="panel p-5">
          <h2 className="text-lg font-extrabold text-copy">Respuesta esperada del backend</h2>
          <div className="mt-5 grid gap-3">
            {["score", "estado", "anotaciones", "errores", "recomendaciones", "semáforo"].map((item) => (
              <div className="soft-panel flex items-center justify-between p-3" key={item}>
                <span className="text-sm font-semibold text-copy">{item}</span>
                <span className="font-mono text-xs font-bold text-muted">mock</span>
              </div>
            ))}
          </div>
        </section>

        {result && (
          <section className="panel p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-bold text-indigo-200">VALIDACIÓN FINALIZADA</p>
                <h2 className="mt-2 text-xl font-extrabold text-copy">{result.subject}</h2>
              </div>
              <Semaphore value={result.semaphore} />
            </div>
            <div className="mt-5 grid gap-3">
              <div className="soft-panel flex items-center justify-between p-3">
                <span className="text-sm text-muted">Score</span>
                <span className="font-mono text-lg font-bold text-copy">{result.score}</span>
              </div>
              <div className="soft-panel flex items-center justify-between p-3">
                <span className="text-sm text-muted">Errores</span>
                <span className="font-mono text-lg font-bold text-rose-200">{result.errors.length}</span>
              </div>
              <div className="soft-panel flex items-center justify-between p-3">
                <span className="text-sm text-muted">Anotaciones</span>
                <span className="font-mono text-lg font-bold text-indigo-200">{result.annotations.length}</span>
              </div>
            </div>
            <Link className="primary-button mt-5 w-full" to={`/reviews/${result.reviewId}`}>
              Ver detalle de revisión
              <ArrowRight size={18} />
            </Link>
          </section>
        )}
      </aside>
    </div>
  );
}
