import { Database, GraduationCap, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import PdfDropzone from "../components/PdfDropzone";
import { ArrowRight, Bot, FileText, UploadCloud } from "lucide-react";
import api from "../services/apiAxios";

export default function SettingsPage() {
  const [file, setFile] = useState(null);
  const [showUploader, setShowUploader] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Selecciona un PDF antes de subir el microcurrículo.");
      return;
    }

    try {
      setError("");
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("file", file);

      await api.post(
        "/api/drive/upload-microcurriculum",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Microcurrículo subido correctamente");

      setFile(null);

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data ||
        "Error subiendo microcurrículo"
      );

    } finally {

      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-5">
      <section className="panel p-5">
        <h2 className="text-xl font-extrabold text-copy">
          Configuración institucional
        </h2>

        <p className="mt-1 text-sm text-muted">
          Parámetros de coordinación para la futura conexión API.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {/* CARD API */}
        <article
          className="panel cursor-pointer p-5 transition hover:border-indigo-400/40"
          onClick={() => setShowUploader(!showUploader)}
        >
          <span
            className="grid h-11 w-11 place-items-center border border-indigo-300/30 bg-indigo-300/10 text-indigo-200"
            style={{ borderRadius: 8 }}
          >
            <Database size={20} />
          </span>

          <h3 className="mt-5 font-extrabold text-copy">API</h3>

          <p className="mt-2 text-sm leading-6 text-muted">
            Presiona para subir documento de configuración API
          </p>
        </article>

        {/* FACULTADES */}
        <article className="panel p-5">
          <span
            className="grid h-11 w-11 place-items-center border border-indigo-300/30 bg-indigo-300/10 text-indigo-200"
            style={{ borderRadius: 8 }}
          >
            <GraduationCap size={20} />
          </span>

          <h3 className="mt-5 font-extrabold text-copy">Facultades</h3>

          <p className="mt-2 text-sm leading-6 text-muted">
            5 programas conectados
          </p>
        </article>

        {/* REGLAS IA */}
        <article className="panel p-5">
          <span
            className="grid h-11 w-11 place-items-center border border-indigo-300/30 bg-indigo-300/10 text-indigo-200"
            style={{ borderRadius: 8 }}
          >
            <SlidersHorizontal size={20} />
          </span>

          <h3 className="mt-5 font-extrabold text-copy">Reglas IA</h3>

          <p className="mt-2 text-sm leading-6 text-muted">
            Rúbrica institucional v2
          </p>
        </article>
      </section>

      {/* UPLOADER */}
        <section className="panel p-5">
          <PdfDropzone
            file={file}
            onFile={setFile}
            title="Subir microcurrículo en PDF"
            description="Arrastra el archivo del microcurrículo o selecciona el PDF institucional para iniciar la validación."
          />
          {error && (
            <p className="mt-4 text-sm font-bold text-rose-300">
              {error}
            </p>
          )}
          <button
            className="primary-button mt-6 w-full sm:w-auto"
            type="button"
            disabled={isSubmitting}
            onClick={handleUpload}
          >
            <UploadCloud size={18} />

            {isSubmitting
              ? "Subiendo microcurrículo..."
              : "Subir microcurrículo"}
          </button>
        </section>
    </div>
  );
}