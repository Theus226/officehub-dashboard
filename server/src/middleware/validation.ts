import { Request, Response, NextFunction } from "express";

export function validateUrl(req: Request, res: Response, next: NextFunction): void {
  const { url } = req.body;

  if (!url || typeof url !== "string") {
    res.status(400).json({ success: false, error: "URL is required" });
    return;
  }

  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      res.status(400).json({
        success: false,
        error: "Only HTTP and HTTPS protocols are allowed",
      });
      return;
    }
  } catch {
    res.status(400).json({ success: false, error: "Invalid URL format" });
    return;
  }

  next();
}

export function validateId(req: Request, res: Response, next: NextFunction): void {
  const { id } = req.params;
  if (!id || typeof id !== "string" || id.length < 1) {
    res.status(400).json({ success: false, error: "Valid ID is required" });
    return;
  }
  next();
}