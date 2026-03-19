import { useState, useCallback, useSyncExternalStore } from "react";
import type { App, CreateAppInput, UpdateAppInput } from "../types";

const STORAGE_KEY = "officehub-apps";

// Snapshot cache — getSnapshot MUST return the same reference when data hasn't changed.
// React throws if getSnapshot returns a new object on every call.
let cachedRaw: string | null = null;
let cachedSnapshot: App[] = [];

function getSnapshot(): App[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedSnapshot = raw ? (JSON.parse(raw) as App[]) : [];
    } catch {
      cachedSnapshot = [];
    }
  }
  return cachedSnapshot;
}

function persist(apps: App[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  // Invalidate cache so next getSnapshot returns the updated data
  cachedRaw = null;
  window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
}

function subscribe(callback: () => void) {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

export function getFaviconUrl(url: string): string {
  try {
    const { hostname } = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=128`;
  } catch {
    return "";
  }
}

export function useApps() {
  const apps = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const [editingApp, setEditingApp] = useState<App | null>(null);

  const addApp = useCallback((input: CreateAppInput) => {
    const now = new Date().toISOString();
    const newApp: App = {
      id: crypto.randomUUID(),
      name: input.name,
      url: input.url,
      favicon: getFaviconUrl(input.url),
      category: input.category,
      createdAt: now,
      updatedAt: now,
    };
    persist([...getSnapshot(), newApp]);
  }, []);

  const updateApp = useCallback((id: string, updates: UpdateAppInput) => {
    const current = getSnapshot();
    persist(
      current.map((app) =>
        app.id === id
          ? {
              ...app,
              ...updates,
              favicon: updates.url ? getFaviconUrl(updates.url) : app.favicon,
              updatedAt: new Date().toISOString(),
            }
          : app
      )
    );
    setEditingApp(null);
  }, []);

  const removeApp = useCallback((id: string) => {
    persist(getSnapshot().filter((app) => app.id !== id));
  }, []);

  return { apps, addApp, updateApp, removeApp, editingApp, setEditingApp };
}