import type { App, CreateAppRequest } from "../types";

const BASE_URL = "/api";

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.error || "Request failed");
  }

  return json.data;
}

export const api = {
  getApps: () => request<App[]>("/apps"),

  createApp: (data: CreateAppRequest) =>
    request<App>("/apps", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateApp: (id: string, data: Partial<App>) =>
    request<App>(`/apps/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteApp: (id: string) =>
    request<{ deleted: boolean }>(`/apps/${id}`, {
      method: "DELETE",
    }),
};