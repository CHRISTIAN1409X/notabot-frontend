import { FileText, UploadCloud } from "lucide-react";
import { useId, useState } from "react";
export default function PdfDropzone({
  file,
  onFile,
  title = "Subir planeador PDF",
  description = "Arrastra el archivo del profesor o selecciona un PDF institucional para iniciar la validación.",
}) {
  const inputId = useId();
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      onFile(selectedFile);
    }
  };

  return (
    <div
      className={`border border-dashed p-6 transition duration-200 ${
        isDragging ? "border-accent bg-accent/10" : "border-line bg-ink/45"
      }`}
      style={{ borderRadius: 8 }}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        handleFile(event.dataTransfer.files?.[0]);
      }}
    >
      <label
        className="grid cursor-pointer place-items-center gap-3 text-center"
        htmlFor={inputId}
      >
        <span
          className="grid h-12 w-12 place-items-center border border-accent/35 bg-accent/10 text-indigo-200"
          style={{ borderRadius: 8 }}
        >
          <UploadCloud size={22} />
        </span>

        <span className="text-lg font-extrabold text-copy">
          {title}
        </span>

        <span className="max-w-md text-sm leading-6 text-muted">
          {description}
        </span>

        <input
          accept="application/pdf"
          className="sr-only"
          id={inputId}
          type="file"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </label>

      {file && (
        <div
          className="mt-5 flex items-center gap-3 border border-line bg-panel/70 p-3"
          style={{ borderRadius: 8 }}
        >
          <FileText size={20} className="text-indigo-200" />

          <div className="min-w-0">
            <p className="truncate font-bold text-copy">{file.name}</p>

            <p className="font-mono text-xs font-bold text-muted">
              {Math.max(1, Math.round(file.size / 1024))} KB
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
