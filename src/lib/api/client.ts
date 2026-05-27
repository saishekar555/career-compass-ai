// Thin API client wrapper. Point VITE_API_BASE_URL at your backend
// (e.g. https://api.resumeiq.internal) via environment variables.

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export interface ApiOptions extends RequestInit {
  token?: string;
}

export async function apiFetch<T>(path: string, opts: ApiOptions = {}): Promise<T> {
  const { token, headers, ...rest } = opts;
  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// Resource-scoped helpers — replace stubs with real endpoints.
export const api = {
  health: () => apiFetch<{ status: string }>("/healthz"),
  analyze: (payload: FormData, token?: string) =>
    apiFetch("/analyze", { method: "POST", body: payload, headers: {}, token }),
  listReports: (token?: string) => apiFetch("/reports", { token }),
  interview: (role: string, token?: string) =>
    apiFetch("/interview", { method: "POST", body: JSON.stringify({ role }), token }),
};
