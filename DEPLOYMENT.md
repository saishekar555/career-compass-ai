# ResumeIQ Enterprise — Deployment Guide

## Architecture

```
┌────────────┐    ┌─────────────┐    ┌──────────────┐
│  Frontend  │───▶│  Backend    │───▶│  PostgreSQL  │
│  (this app)│    │  (./backend)│    │  + Redis     │
└────────────┘    └─────────────┘    └──────────────┘
        ▲                ▲
        │                │
        └──── AKS (Azure Kubernetes Service)
              Multi-env: dev / stage / prod
```

## Local dev

```bash
cp .env.example .env
bun install
bun run dev               # frontend on :3000
docker compose up         # full stack (web + postgres + redis)
```

## CI/CD (Azure DevOps)

Pipeline definition: [`azure-pipelines.yml`](./azure-pipelines.yml)

Flow: **Build** → push image to **Azure Container Registry** → deploy to AKS
**dev** → **stage** → **prod** (each stage gated by environment approval).

Service connections to create in Azure DevOps:
- `sc-azure-resumeiq` — ARM service connection for Terraform
- `acrresumeiq` — Docker registry (ACR)
- `aks-dev`, `aks-stage`, `aks-prod` — Kubernetes service connections

## Infrastructure (Terraform)

```bash
cd infra/terraform
terraform init -backend-config="..."
terraform workspace select dev || terraform workspace new dev
terraform apply -var-file=envs/dev.tfvars
```

Provisions: Resource Group, ACR, AKS, ACR↔AKS pull permissions.
Extend with Key Vault, Postgres Flexible Server, Storage Account, Front Door.

## Kubernetes (Kustomize)

```bash
kubectl apply -k deploy/k8s/overlays/dev
kubectl apply -k deploy/k8s/overlays/stage
kubectl apply -k deploy/k8s/overlays/prod
```

Each overlay pins image tag and replica count for that environment.
Base manifests include Deployment, Service, Ingress (TLS via cert-manager),
HPA (CPU + memory) and ConfigMap. Secrets are managed out-of-band via
Azure Key Vault → CSI driver.

## Health checks

| Endpoint        | Used by                          |
|-----------------|----------------------------------|
| `/api/healthz`  | livenessProbe, readinessProbe, ALB |
| `/api/readyz`   | readinessProbe (backend)         |

## Observability

- **Logs** — stdout JSON, scraped by Azure Monitor / Loki
- **Metrics** — Prometheus + Grafana (see `deploy/k8s/base/hpa.yaml`)
- **Traces** — OpenTelemetry → `OTEL_EXPORTER_OTLP_ENDPOINT`
- **Audit** — `/activity-logs` UI + immutable log stream
