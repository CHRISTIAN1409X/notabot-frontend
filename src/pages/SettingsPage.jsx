import { Database, GraduationCap, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import PdfDropzone from "../components/PdfDropzone";

export default function SettingsPage() {
  const [file, setFile] = useState(null);
  const [showUploader, setShowUploader] = useState(false);

  return (
    <div className="mx-auto grid max-w-5xl gap-5">
      <section className="panel p-5">
        <h2 className="text-xl font-extrabold text-copy">
          Configuracion institucional
        </h2>

        <p className="mt-1 text-sm text-muted">
          Parametros de coordinacion para la futura conexion API.
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
            Presiona para subir documento de configuracion API
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
            Rubrica institucional v2
          </p>
        </article>
      </section>

      {/* UPLOADER */}
        <section className="panel p-5">
          <PdfDropzone
            file={file}
            onFile={setFile}
            title="Subir microcurriculo en PDF"
            description="Arrastra el archivo del microcurriculo o selecciona el PDF institucional para iniciar la validacion."
          />
        </section>
    </div>
  );
}