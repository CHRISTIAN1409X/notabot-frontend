import { FileText, Search, ZoomIn } from "lucide-react";

export default function PdfViewerMock({ review }) {
  return (
    <section className="panel min-h-[720px] overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="grid h-10 w-10 place-items-center bg-rose-400/10 text-rose-200"
            style={{ borderRadius: 8 }}
          >
            <FileText size={19} />
          </span>

          <div className="min-w-0">
            <h2 className="truncate font-extrabold text-copy">
              {review.pdfName}
            </h2>

            <p className="font-mono text-xs font-bold text-muted">
              PDF VIEWER
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="icon-button" type="button">
            <Search size={17} />
          </button>

          <button className="icon-button" type="button">
            <ZoomIn size={17} />
          </button>
        </div>
      </div>

      <div className="h-[85vh] w-full bg-slate-950/70">
        <iframe
          src={review.pdfUrl}
          title="PDF Viewer"
          className="h-full w-full"
        />
      </div>
    </section>
  );
}
