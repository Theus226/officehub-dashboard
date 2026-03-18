import { Request, Response } from "express";
import * as appsService from "../services/appsService";

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const app = await appsService.createApp(req.body);
    res.status(201).json({ success: true, data: app });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export function list(_req: Request, res: Response): void {
  try {
    const apps = appsService.listApps();
    res.json({ success: true, data: apps });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export function getById(req: Request, res: Response): void {
  const app = appsService.findApp(req.params.id);
  if (!app) {
    res.status(404).json({ success: false, error: "App not found" });
    return;
  }
  res.json({ success: true, data: app });
}

export async function update(req: Request, res: Response): Promise<void> {
  try {
    const app = appsService.editApp(req.params.id, req.body);
    if (!app) {
      res.status(404).json({ success: false, error: "App not found" });
      return;
    }
    res.json({ success: true, data: app });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export function remove(req: Request, res: Response): void {
  const deleted = appsService.removeApp(req.params.id);
  if (!deleted) {
    res.status(404).json({ success: false, error: "App not found" });
    return;
  }
  res.json({ success: true, data: { deleted: true } });
}