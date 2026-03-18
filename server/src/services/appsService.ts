import { v4 as uuidv4 } from "uuid";
import * as db from "../models/database";
import { discoverSiteMetadata } from "./faviconService";
import type { App, CreateAppRequest, UpdateAppRequest } from "../types";

export async function createApp(request: CreateAppRequest): Promise<App> {
  const metadata = await discoverSiteMetadata(request.url);

  const app: App = {
    id: uuidv4(),
    name: request.name || metadata.name,
    url: request.url,
    favicon: metadata.favicon,
    category: request.category || "General",
    color: request.color,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return db.addApp(app);
}

export function listApps(): App[] {
  return db.getAllApps();
}

export function findApp(id: string): App | undefined {
  return db.getAppById(id);
}

export function editApp(id: string, updates: UpdateAppRequest): App | null {
  return db.updateApp(id, updates);
}

export function removeApp(id: string): boolean {
  return db.deleteApp(id);
}