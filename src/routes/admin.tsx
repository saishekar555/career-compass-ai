import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { StatCard } from "@/components/stat-card";
import { Users, Activity, Database, Server, Cpu, HardDrive, AlertTriangle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · ResumeIQ Enterprise" },
      { name: "description", content: "Tenant administration, user management and system health." },
    ],
  }),
  component: AdminPage,
});

const users = [
  { name: "Alex Morgan", email: "alex@company.com", role: "Owner", status: "active", lastSeen: "2m ago" },
  { name: "Priya Shah", email: "priya@company.com", role: "Admin", status: "active", lastSeen: "14m ago" },
  { name: "Diego Reyes", email: "diego@company.com", role: "Analyst", status: "active", lastSeen: "1h ago" },
  { name: "Hannah Kim", email: "hannah@company.com", role: "Viewer", status: "invited", lastSeen: "—" },
  { name: "Marc Petit", email: "marc@company.com", role: "Analyst", status: "suspended", lastSeen: "3d ago" },
];

const services = [
  { name: "api-gateway", status: "healthy", uptime: "99.99%", region: "eastus" },
  { name: "ats-analyzer", status: "healthy", uptime: "99.97%", region: "eastus" },
  { name: "llm-orchestrator", status: "degraded", uptime: "99.42%", region: "westeurope" },
  { name: "report-renderer", status: "healthy", uptime: "100.0%", region: "eastus" },
  { name: "postgres-primary", status: "healthy", uptime: "99.99%", region: "eastus" },
];

const statusColors = {
  active: "bg-success/15 text-success",
  invited: "bg-warning/15 text-warning",
  suspended: "bg-destructive/15 text-destructive",
  healthy: "bg-success/15 text-success",
  degraded: "bg-warning/15 text-warning",
  down: "bg-destructive/15 text-destructive",
} as const;

function AdminPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="bg-mesh pointer-events-none fixed inset-0 -z-10" />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Tenant · acme-prod</div>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Admin Console</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage users, monitor services and review platform health.</p>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-2 rounded-xl glass px-3 py-2 text-xs"><CheckCircle2 className="h-4 w-4 text-success" /> All systems operational</span>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<Users className="h-4 w-4" />} label="Active users" value="1,284" sub="+12% week-over-week" accent />
          <StatCard icon={<Activity className="h-4 w-4" />} label="Analyses (24h)" value="3,492" sub="Avg 142 ms" />
          <StatCard icon={<Cpu className="h-4 w-4" />} label="CPU usage" value="47%" sub="across 12 pods" />
          <StatCard icon={<HardDrive className="h-4 w-4" />} label="Storage" value="1.2 TB" sub="of 5 TB allocated" />
        </div>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                <h2 className="text-lg font-semibold">Users & Roles</h2>
              </div>
              <button className="rounded-lg bg-gradient-to-r from-primary to-accent px-3 py-1.5 text-xs font-medium text-primary-foreground">Invite user</button>
            </div>
            <div className="mt-5 overflow-hidden rounded-xl border border-glass-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left">User</th>
                    <th className="px-3 py-2 text-left">Role</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-left">Last seen</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.email} className="border-t border-glass-border">
                      <td className="px-3 py-2">
                        <div className="font-medium">{u.name}</div>
                        <div className="text-xs text-muted-foreground">{u.email}</div>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">{u.role}</td>
                      <td className="px-3 py-2"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[u.status as keyof typeof statusColors]}`}>{u.status}</span></td>
                      <td className="px-3 py-2 text-muted-foreground">{u.lastSeen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold">Service Health</h2>
            </div>
            <div className="mt-5 space-y-2">
              {services.map((s) => (
                <div key={s.name} className="flex items-center justify-between rounded-xl border border-glass-border bg-secondary/40 p-3">
                  <div>
                    <div className="text-sm font-medium">{s.name}</div>
                    <div className="text-xs text-muted-foreground">region: {s.region} · uptime {s.uptime}</div>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[s.status as keyof typeof statusColors]}`}>{s.status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 glass-card rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold">Recent Platform Events</h2>
          </div>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success" /> Deployment <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">v2.14.3</code> succeeded in <span className="text-foreground">prod-eastus</span> · 12m ago</li>
            <li className="flex items-start gap-3"><AlertTriangle className="mt-0.5 h-4 w-4 text-warning" /> Elevated latency on <span className="text-foreground">llm-orchestrator</span> (p95 720ms) · 38m ago</li>
            <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success" /> Database backup completed (1.2 TB) · 2h ago</li>
            <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success" /> Terraform plan applied to <span className="text-foreground">stage</span> · 6h ago</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
