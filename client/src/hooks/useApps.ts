import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import type { App, CreateAppRequest } from "../types";

export function useApps() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApps = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getApps();
      setApps(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addApp = useCallback(async (request: CreateAppRequest) => {
    const newApp = await api.createApp(request);
    setApps((prev) => [...prev, newApp]);
    return newApp;
  }, []);

  const removeApp = useCallback(async (id: string) => {
    await api.deleteApp(id);
    setApps((prev) => prev.filter((app) => app.id !== id));
  }, []);

  const editApp = useCallback(async (id: string, updates: Partial<App>) => {
    const updated = await api.updateApp(id, updates);
    setApps((prev) => prev.map((app) => (app.id === id ? updated : app)));
    return updated;
  }, []);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  return { apps, loading, error, addApp, removeApp, editApp, refresh: fetchApps };
}