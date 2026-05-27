import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { ScoreRing } from "@/components/score-ring";
import { StatCard } from "@/components/stat-card";
import { mockAnalysis } from "@/lib/mock-analysis";
import {
  Briefcase, Target, Sparkles, TrendingUp, Download, ArrowRight,
  Lightbulb, MessageSquare, AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · ResumeIQ" },
      { name: "description", content: "Your AI-powered career intelligence dashboard." },
    ],
  }),
  component: DashboardPage,
});

const importanceColor = {
  high: "bg-destructive/15 text-destructive",
  medium: "bg-warning/15 text-warning",
  low: "bg-success/15 text-success",
} as const;

const difficultyColor = {
  easy: "bg-success/15 text-success",
  medium: "bg-warning/15 text-warning",
  hard: "bg-destructive/15 text-destructive",
} as const;

function DashboardPage() {
  const a = mockAnalysis;
  const downloadReport = () => {
    const blob = new Blob([JSON.stringify(a, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `resumeiq-report-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="bg-mesh pointer-events-none fixed inset-0 -z-10" />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Analysis</div>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Welcome back, Alex</h1>
            <p className="mt-1 text-sm text-muted-foreground">Last analyzed: {a.filename} · just now</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={downloadReport}
              className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <Download className="h-4 w-4" /> Download report
            </button>
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow"
            >
              New analysis <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Top row */}
        <div className="grid gap-5 lg:grid-cols-4">
          <div className="glass-card flex flex-col items-center justify-center rounded-2xl p-6 lg:col-span-1 shadow-glow">
            <ScoreRing score={a.atsScore} />
            <div className="mt-4 text-center text-sm text-muted-foreground">
              You rank in the <span className="text-foreground font-medium">top 18%</span> of applicants
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-3 lg:col-span-3">
            <StatCard icon={<Target className="h-4 w-4" />} label="Top Match" value="94%" sub="Senior Frontend · Linear" accent />
            <StatCard icon={<Briefcase className="h-4 w-4" />} label="Job Matches" value={String(a.jobMatches.length)} sub="Across 12 companies" />
            <StatCard icon={<TrendingUp className="h-4 w-4" />} label="Score Trend" value="+12" sub="vs previous upload" />
            <StatCard icon={<Sparkles className="h-4 w-4" />} label="Skills Detected" value={String(a.skills.length)} sub="Mapped to taxonomy" />
            <StatCard icon={<AlertTriangle className="h-4 w-4" />} label="Skill Gaps" value={String(a.skillGaps.length)} sub="Prioritized by demand" />
            <StatCard icon={<MessageSquare className="h-4 w-4" />} label="Interview Qs" value={String(a.interviewQuestions.length)} sub="Tailored to your stack" />
          </div>
        </div>

        {/* ATS breakdown */}
        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold">ATS Breakdown</h2>
            <p className="text-sm text-muted-foreground">How each scoring dimension contributes.</p>
            <div className="mt-6 space-y-4">
              {a.breakdown.map((b) => (
                <div key={b.label}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="text-muted-foreground">{b.label}</span>
                    <span className="font-medium">{b.score}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                      style={{ width: `${b.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold">Detected Skills</h2>
            <p className="text-sm text-muted-foreground">Confidence based on context and frequency.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {a.skills.map((s) => (
                <div key={s.name} className="rounded-xl border border-glass-border bg-secondary/50 px-3 py-2">
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="mt-1 h-1 w-24 overflow-hidden rounded-full bg-background">
                    <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Skill Gaps</h3>
            <div className="mt-3 space-y-2">
              {a.skillGaps.map((g) => (
                <div key={g.skill} className="flex items-start justify-between gap-3 rounded-xl border border-glass-border bg-secondary/40 p-3">
                  <div>
                    <div className="text-sm font-medium">{g.skill}</div>
                    <div className="text-xs text-muted-foreground">{g.reason}</div>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${importanceColor[g.importance]}`}>
                    {g.importance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Suggestions + Jobs */}
        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold">Improvement Suggestions</h2>
            </div>
            <div className="mt-5 space-y-3">
              {a.suggestions.map((s) => (
                <div key={s.title} className="rounded-xl border border-glass-border bg-secondary/40 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">{s.title}</h4>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${importanceColor[s.impact]}`}>{s.impact} impact</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold">Top Job Matches</h2>
            </div>
            <div className="mt-5 space-y-3">
              {a.jobMatches.map((j) => (
                <div key={j.title + j.company} className="flex items-center justify-between rounded-xl border border-glass-border bg-secondary/40 p-4">
                  <div>
                    <div className="text-sm font-semibold">{j.title}</div>
                    <div className="text-xs text-muted-foreground">{j.company} · {j.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gradient">{j.match}%</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">match</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interview */}
        <section className="mt-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold">AI-Generated Interview Questions</h2>
            </div>
            <p className="text-sm text-muted-foreground">Tailored to your experience and target roles.</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {a.interviewQuestions.map((q, i) => (
                <div key={i} className="rounded-xl border border-glass-border bg-secondary/40 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">{q.category}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${difficultyColor[q.difficulty]}`}>{q.difficulty}</span>
                  </div>
                  <p className="text-sm">{q.question}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
