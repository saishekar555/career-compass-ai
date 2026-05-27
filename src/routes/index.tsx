import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import {
  Sparkles, Target, Brain, FileSearch, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResumeIQ — AI Resume Analyzer & Interview Coach" },
      { name: "description", content: "Get instant ATS scoring, AI-generated interview questions, skill gap detection, and personalized job matches." },
      { property: "og:title", content: "ResumeIQ — AI Resume Analyzer & Interview Coach" },
      { property: "og:description", content: "Land interviews faster with AI-powered resume analysis and coaching." },
    ],
  }),
  component: LandingPage,
});

const features = [
  { icon: Target, title: "ATS Score Analysis", desc: "Instant compatibility scoring across keyword density, formatting, and structure." },
  { icon: Brain, title: "AI Interview Coach", desc: "Role-specific questions generated from your actual experience." },
  { icon: FileSearch, title: "Skill Gap Detection", desc: "See exactly which skills you need for the next level." },
  { icon: TrendingUp, title: "Job Role Matching", desc: "Match against thousands of real openings with confidence scores." },
  { icon: ShieldCheck, title: "Enterprise-grade Privacy", desc: "Your resume stays yours. Encrypted in transit and at rest." },
  { icon: Sparkles, title: "Actionable Suggestions", desc: "Line-by-line rewrites prioritized by impact." },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-mesh pointer-events-none absolute inset-0 -z-10" />
        <div className="bg-hero pointer-events-none absolute inset-0 -z-10" />

        <div className="mx-auto max-w-7xl px-6 pt-20 pb-28 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Powered by frontier AI models
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Land your next role with a <span className="text-gradient">resume that ranks.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            ResumeIQ scores your resume against real ATS systems, surfaces skill gaps, and coaches you through tailored interview questions — in seconds.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/analyze" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]">
              Analyze my resume <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              View live dashboard
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
            {["No credit card required", "GDPR & SOC 2 ready", "Free starter plan"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Preview card */}
      <section className="mx-auto -mt-8 max-w-6xl px-6">
        <div className="glass-card relative overflow-hidden rounded-3xl p-2 shadow-elevated">
          <div className="rounded-[20px] bg-card p-8">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { k: "ATS Score", v: "82", s: "+12 vs last upload" },
                { k: "Top Match", v: "94%", s: "Senior Frontend · Linear" },
                { k: "Skill Gaps", v: "3", s: "Kubernetes, Rust, LLM Ops" },
              ].map((stat) => (
                <div key={stat.k} className="rounded-2xl border border-glass-border bg-secondary/40 p-5">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{stat.k}</div>
                  <div className="mt-2 text-4xl font-semibold tracking-tight text-gradient">{stat.v}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{stat.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight">Everything you need to get hired</h2>
          <p className="mt-4 text-muted-foreground">A complete career intelligence platform — not just a resume checker.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="glass-card group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-elevated">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/80 to-accent/80 text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-28">
        <div className="glass-card relative overflow-hidden rounded-3xl p-12 text-center shadow-elevated">
          <div className="bg-mesh pointer-events-none absolute inset-0 -z-10" />
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Ready to outrank the algorithm?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Upload your resume and get a complete analysis in under 10 seconds.</p>
          <Link to="/analyze" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]">
            Start free analysis <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-glass-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} ResumeIQ. All rights reserved.</span>
          <span>Built with care · Privacy-first · SOC 2 ready</span>
        </div>
      </footer>
    </div>
  );
}
