import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import type { App } from "../../shared/types";

const DB_PATH = join(__dirname, "../../data/apps.json");

function ensureDbExists(): void {
  if (!existsSync(DB_PATH)) {
    writeFileSync(DB_PATH, "[]", "utf-8");
  }
}

export function getAllApps(): App[] {
  ensureDbExists();
  const raw = readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw) as App[];
}

export function getAppById(id: string): App | undefined {
  return getAllApps().find((app) => app.id === id);
}

export function saveApps(apps: App[]): void {
  ensureDbExists();
  writeFileSync(DB_PATH, JSON.stringify(apps, null, 2), "utf-8");
}

export function addApp(app: App): App {
  const apps = getAllApps();
  apps.push(app);
  saveApps(apps);
  return app;
}

export function updateApp(id: string, updates: Partial<App>): App | null {
  const apps = getAllApps();
  const index = apps.findIndex((app) => app.id === id);
  if (index === -1) return null;

  apps[index] = { ...apps[index], ...updates, updatedAt: new Date().toISOString() };
  saveApps(apps);
  return apps[index];
}

export function deleteApp(id: string): boolean {
  const apps = getAllApps();
  const filtered = apps.filter((app) => app.id !== id);
  if (filtered.length === apps.length) return false;
  saveApps(filtered);
  return true;
}