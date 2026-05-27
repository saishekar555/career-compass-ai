import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { StatCard } from "@/components/stat-card";
import { TrendingUp, Users, FileText, Zap } from "lucide-react";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics · ResumeIQ Enterprise" },
      { name: "description", content: "Usage analytics and performance trends." },
    ],
  }),
  component: AnalyticsPage,
});

const trend = [42, 58, 51, 67, 72, 81, 78, 88, 94, 89, 102, 118, 124, 132];
const max = Math.max(...trend);

function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="bg-mesh pointer-events-none fixed inset-0 -z-10" />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Insights</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">Last 14 days · auto-refreshed every 60s.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<FileText className="h-4 w-4" />} label="Resumes analyzed" value="14,329" sub="+18.2%" accent />
          <StatCard icon={<Users className="h-4 w-4" />} label="Active users" value="2,108" sub="+9.4%" />
          <StatCard icon={<Zap className="h-4 w-4" />} label="Avg ATS score" value="78.4" sub="+3.1 pts" />
          <StatCard icon={<TrendingUp className="h-4 w-4" />} label="Conversion" value="6.8%" sub="trial → paid" />
        </div>

        <section className="mt-8 glass-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Analyses per day</h2>
          <p className="text-sm text-muted-foreground">Volume across all tenants.</p>
          <div className="mt-6 flex h-56 items-end gap-2">
            {trend.map((v, i) => (
              <div key={i} className="group relative flex-1">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-primary to-accent transition-all hover:opacity-80"
                  style={{ height: `${(v / max) * 100}%` }}
                />
                <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-foreground px-1.5 py-0.5 text-[10px] text-background opacity-0 group-hover:opacity-100">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>14d ago</span><span>7d ago</span><span>Today</span>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold">Top job roles matched</h2>
            <div className="mt-5 space-y-3">
              {[
                { name: "Senior Frontend Engineer", v: 412 },
                { name: "Full-Stack Engineer", v: 367 },
                { name: "Product Engineer", v: 281 },
                { name: "Staff Platform Engineer", v: 198 },
                { name: "Engineering Manager", v: 142 },
              ].map((r) => (
                <div key={r.name}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span>{r.name}</span><span className="text-muted-foreground">{r.v}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${(r.v / 412) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold">API latency (p95)</h2>
            <div className="mt-5 space-y-3">
              {[
                { name: "POST /api/analyze", v: "182 ms" },
                { name: "GET /api/match", v: "94 ms" },
                { name: "POST /api/interview", v: "412 ms" },
                { name: "GET /api/report/:id", v: "61 ms" },
                { name: "GET /api/healthz", v: "8 ms" },
              ].map((r) => (
                <div key={r.name} className="flex items-center justify-between rounded-xl border border-glass-border bg-secondary/40 p-3">
                  <code className="text-xs">{r.name}</code>
                  <span className="text-sm font-medium">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
