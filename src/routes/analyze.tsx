import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { UploadZone } from "@/components/upload-zone";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/analyze")({
  head: () => ({
    meta: [
      { title: "Analyze Resume · ResumeIQ" },
      { name: "description", content: "Upload your resume and get instant AI-powered analysis." },
    ],
  }),
  component: AnalyzePage,
});

function AnalyzePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="bg-hero pointer-events-none fixed inset-0 -z-10" />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight">Analyze your resume</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            We'll run ATS scoring, extract your skills, detect gaps, and generate interview questions in seconds.
          </p>
        </div>

        <div className="mt-10">
          <UploadZone onComplete={() => navigate({ to: "/dashboard" })} />
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            "Private by design",
            "No resume stored without consent",
            "Results in < 10 seconds",
          ].map((t) => (
            <div key={t} className="glass-card flex items-center gap-2 rounded-xl p-3 text-sm">
              <CheckCircle2 className="h-4 w-4 text-success" /> {t}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
