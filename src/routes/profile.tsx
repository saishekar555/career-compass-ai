import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { User, Mail, Briefcase, MapPin, Shield, Bell, Key } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile · ResumeIQ Enterprise" },
      { name: "description", content: "Manage your profile, preferences and security." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="bg-mesh pointer-events-none fixed inset-0 -z-10" />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Account</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Profile & Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your personal info, security and notifications.</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="glass-card rounded-2xl p-6 lg:col-span-1 flex flex-col items-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow flex items-center justify-center text-3xl font-semibold text-primary-foreground">A</div>
            <h2 className="mt-4 text-lg font-semibold">Alex Morgan</h2>
            <p className="text-sm text-muted-foreground">Senior Frontend Engineer</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground w-full">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> alex@company.com</div>
              <div className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> ResumeIQ Inc.</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Remote · UTC-5</div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <SettingsCard icon={<User className="h-4 w-4" />} title="Personal Information" desc="Update your name and contact details.">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Full name" value="Alex Morgan" />
                <Field label="Email" value="alex@company.com" />
                <Field label="Job title" value="Senior Frontend Engineer" />
                <Field label="Location" value="Remote" />
              </div>
            </SettingsCard>

            <SettingsCard icon={<Shield className="h-4 w-4" />} title="Security" desc="Password and two-factor authentication.">
              <div className="space-y-3">
                <Toggle label="Two-factor authentication" enabled />
                <Toggle label="Session timeout (30 min)" enabled />
                <button className="inline-flex items-center gap-2 rounded-xl glass px-3 py-2 text-sm hover:bg-secondary"><Key className="h-4 w-4" /> Change password</button>
              </div>
            </SettingsCard>

            <SettingsCard icon={<Bell className="h-4 w-4" />} title="Notifications" desc="Choose what we email you about.">
              <div className="space-y-3">
                <Toggle label="Weekly analytics digest" enabled />
                <Toggle label="New job matches" enabled />
                <Toggle label="Product updates" />
              </div>
            </SettingsCard>
          </div>
        </div>
      </main>
    </div>
  );
}

function SettingsCard({ icon, title, desc, children }: { icon: React.ReactNode; title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-2">
        <div className="text-accent">{icon}</div>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <input defaultValue={value} className="mt-1.5 w-full rounded-xl border border-glass-border bg-secondary/40 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </label>
  );
}

function Toggle({ label, enabled = false }: { label: string; enabled?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-glass-border bg-secondary/40 p-3">
      <span className="text-sm">{label}</span>
      <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${enabled ? "bg-gradient-to-r from-primary to-accent" : "bg-secondary"}`}>
        <span className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${enabled ? "translate-x-4" : "translate-x-0.5"}`} />
      </span>
    </div>
  );
}
