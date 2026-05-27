import type { ReactNode } from "react";

export function StatCard({
  icon, label, value, sub, accent,
}: { icon: ReactNode; label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`glass-card rounded-2xl p-5 ${accent ? "shadow-glow" : ""}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent ? "bg-gradient-to-br from-primary to-accent text-primary-foreground" : "bg-secondary text-foreground"}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 text-3xl font-semibold tracking-tight">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}
