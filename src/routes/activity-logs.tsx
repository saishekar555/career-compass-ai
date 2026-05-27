import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Activity, Search, Filter, Download } from "lucide-react";

export const Route = createFileRoute("/activity-logs")({
  head: () => ({
    meta: [
      { title: "Activity Logs · ResumeIQ Enterprise" },
      { name: "description", content: "Audit trail of platform and user activity." },
    ],
  }),
  component: ActivityLogsPage,
});

const levelColor = {
  info: "bg-primary/15 text-primary",
  warn: "bg-warning/15 text-warning",
  error: "bg-destructive/15 text-destructive",
  audit: "bg-accent/15 text-accent",
} as const;

const logs = [
  { ts: "2026-05-27 14:22:11", actor: "alex@company.com", action: "resume.analyze", target: "Resume_2026.pdf", level: "info" },
  { ts: "2026-05-27 14:18:02", actor: "system", action: "k8s.deployment.rollout", target: "ats-analyzer@v2.14.3", level: "audit" },
  { ts: "2026-05-27 14:09:47", actor: "priya@company.com", action: "user.invite", target: "hannah@company.com", level: "audit" },
  { ts: "2026-05-27 13:51:18", actor: "system", action: "llm.timeout", target: "session_8a92", level: "warn" },
  { ts: "2026-05-27 13:40:00", actor: "system", action: "db.backup", target: "postgres-primary", level: "info" },
  { ts: "2026-05-27 13:21:55", actor: "marc@company.com", action: "auth.login.failed", target: "—", level: "error" },
  { ts: "2026-05-27 12:48:30", actor: "alex@company.com", action: "report.download", target: "resumeiq-report-1832.pdf", level: "info" },
  { ts: "2026-05-27 12:02:11", actor: "system", action: "tf.apply", target: "env/stage", level: "audit" },
];

function ActivityLogsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="bg-mesh pointer-events-none fixed inset-0 -z-10" />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Observability</div>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight flex items-center gap-3"><Activity className="h-7 w-7 text-accent" /> Activity Logs</h1>
            <p className="mt-1 text-sm text-muted-foreground">Tamper-evident audit log streamed from all services.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl glass px-3 py-2 text-sm hover:bg-secondary"><Download className="h-4 w-4" /> Export CSV</button>
        </div>

        <div className="glass-card rounded-2xl p-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-glass-border bg-secondary/40 px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input placeholder="Search actor, action or target…" className="w-full bg-transparent text-sm outline-none" />
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl glass px-3 py-2 text-sm"><Filter className="h-4 w-4" /> Filters</button>
          </div>
        </div>

        <div className="glass-card mt-5 overflow-hidden rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Timestamp (UTC)</th>
                <th className="px-4 py-3 text-left">Actor</th>
                <th className="px-4 py-3 text-left">Action</th>
                <th className="px-4 py-3 text-left">Target</th>
                <th className="px-4 py-3 text-left">Level</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l, i) => (
                <tr key={i} className="border-t border-glass-border hover:bg-secondary/30">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{l.ts}</td>
                  <td className="px-4 py-3">{l.actor}</td>
                  <td className="px-4 py-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs">{l.action}</code></td>
                  <td className="px-4 py-3 text-muted-foreground">{l.target}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${levelColor[l.level as keyof typeof levelColor]}`}>{l.level}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
