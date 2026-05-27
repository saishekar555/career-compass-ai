import { createFileRoute } from "@tanstack/react-router";

// Liveness/readiness probe for Kubernetes & load balancers.
// Wire to /healthz and /readyz in your ingress / service manifest.
export const Route = createFileRoute("/api/healthz")({
  server: {
    handlers: {
      GET: async () => {
        return Response.json({
          status: "ok",
          service: "resumeiq-web",
          version: process.env.APP_VERSION ?? "dev",
          timestamp: new Date().toISOString(),
          uptime: typeof process !== "undefined" && process.uptime ? process.uptime() : 0,
        });
      },
    },
  },
});
