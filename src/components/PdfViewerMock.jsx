import { FileText, Search, ZoomIn } from "lucide-react";

export default function PdfViewerMock({ review }) {
  return (
    <section className="panel min-h-[720px] overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 place-items-center bg-rose-400/10 text-rose-200" style={{ borderRadius: 8 }}>
            <FileText size={19} />
          </span>
          <div className="min-w-0">
            <h2 className="truncate font-extrabold text-copy">{review.pdfName}</h2>
            <p className="font-mono text-xs font-bold text-muted">PDF VIEWER - pagina 1 de 12</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="icon-button" type="button" aria-label="Buscar en PDF">
            <Search size={17} />
          </button>
          <button className="icon-button" type="button" aria-label="Ampliar PDF">
            <ZoomIn size={17} />
          </button>
        </div>
      </div>

      <div className="bg-slate-950/70 p-5">
        <div className="mx-auto min-h-[635px] max-w-[620px] border border-slate-300/20 bg-slate-100 p-7 text-slate-900 shadow-2xl" style={{ borderRadius: 4 }}>
          <div className="border-b border-slate-300 pb-4">
            <p className="font-mono text-xs font-bold text-slate-500">UNIVERSIDAD CENTRAL - PLANEADOR ACADEMICO</p>
            <h3 className="mt-3 text-2xl font-extrabold text-slate-950">{review.subject}</h3>
            <p className="mt-1 text-sm font-semibold text-slate-600">{review.program}</p>
          </div>

          <div className="mt-6 grid gap-4 text-sm leading-6">
            <div>
              <p className="font-mono text-xs font-bold text-slate-500">PROFESOR</p>
              <p className="font-bold">{review.professor}</p>
            </div>
            <div>
              <p className="font-mono text-xs font-bold text-slate-500">RESULTADOS DE APRENDIZAJE</p>
              <p>
                RA-01: Aplica modelos conceptuales para resolver problemas academicos.
                RA-02: Integra evidencias verificables en escenarios practicos.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["Semana 4", "Semana 5", "Semana 6"].map((week, index) => (
                <div className="border border-slate-300 p-3" style={{ borderRadius: 4 }} key={week}>
                  <p className="font-bold">{week}</p>
                  <p className="mt-2 text-xs text-slate-600">
                    {index === 2 ? "Evidencia pendiente para RA-02" : "Actividad y evaluacion registradas"}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-l-4 border-amber-400 bg-amber-50 p-4">
              <p className="font-bold">Anotacion IA</p>
              <p className="text-sm text-slate-700">
                La semana 6 requiere evidencia verificable y criterio de evaluacion medible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
