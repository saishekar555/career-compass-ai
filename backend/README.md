# ResumeIQ Backend (scaffold)

This folder is reserved for the dedicated backend service. The current Lovable
app ships server logic via TanStack Start server functions and `/api/*` server
routes (see `src/routes/api/`), which is sufficient for production on the
managed runtime.

For an enterprise split-stack deployment, run a dedicated backend here
(Node.js / FastAPI / Go) packaged as its own container and deployed to AKS
alongside the frontend.

## Suggested structure

```
backend/
├── src/
│   ├── routes/          # HTTP handlers (auth, analyze, interview, reports)
│   ├── services/        # Business logic (ats-scorer, llm-client, matcher)
│   ├── repositories/    # DB access (postgres, redis)
│   ├── middleware/      # auth, logging, rate-limit, tracing
│   ├── config/          # env loader + validation
│   └── index.ts         # server bootstrap
├── tests/
├── Dockerfile
└── package.json
```

## Endpoints (contract)

| Method | Path                 | Description                       |
|--------|----------------------|-----------------------------------|
| GET    | `/api/healthz`       | Liveness probe                    |
| GET    | `/api/readyz`        | Readiness probe                   |
| POST   | `/api/auth/login`    | Email/password login              |
| POST   | `/api/auth/refresh`  | Rotate access token               |
| POST   | `/api/analyze`       | Upload resume → ATS analysis      |
| GET    | `/api/reports`       | List user reports                 |
| GET    | `/api/reports/:id`   | Fetch single report               |
| POST   | `/api/interview`     | Generate interview questions      |
| GET    | `/api/admin/users`   | Admin: list users (RBAC required) |
| GET    | `/api/admin/audit`   | Admin: stream audit log           |

## Environment

See `../.env.example`. The backend is fully twelve-factor — every config
value comes from env vars and is mounted via Kubernetes `Secret` / `ConfigMap`.
