import { useCallback, useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";

export function UploadZone({ onComplete }: { onComplete: (filename: string) => void }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || !files[0]) return;
    const f = files[0];
    setFile(f);
    setAnalyzing(true);
    // Simulated AI processing — replace with real API call.
    setTimeout(() => {
      setAnalyzing(false);
      onComplete(f.name);
    }, 1600);
  }, [onComplete]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
      className={`glass-card relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-12 text-center transition-all ${
        dragging ? "border-primary shadow-glow scale-[1.01]" : "border-glass-border"
      }`}
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-glow">
        {analyzing ? <Loader2 className="h-7 w-7 animate-spin text-primary-foreground" /> :
          file ? <FileText className="h-7 w-7 text-primary-foreground" /> :
          <Upload className="h-7 w-7 text-primary-foreground" />}
      </div>
      <h3 className="text-xl font-semibold">
        {analyzing ? "Analyzing your resume…" : file ? file.name : "Drop your resume here"}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {analyzing
          ? "Running ATS scoring, skill extraction, and job matching."
          : "PDF, DOCX or TXT — up to 10MB. We scan for ATS compatibility, skills and job fit."}
      </p>
      {!analyzing && (
        <label className="mt-6 cursor-pointer rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]">
          Browse files
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      )}
    </div>
  );
}
