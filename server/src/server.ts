import express from "express";
import { networkInterfaces } from "os";
import appsRouter from "./routes/apps";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// CORS Configuration - Aggressive approach
app.use((req, res, next) => {
  // Always set CORS headers
  const origin = req.headers.origin || "*";
  res.set("Access-Control-Allow-Origin", origin === "null" ? "*" : origin);
  res.set("Access-Control-Allow-Methods", "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS");
  res.set("Access-Control-Expose-Headers", "Content-Length, X-JSON-Response-Type");
  
  if (req.method === "OPTIONS") {
    // Preflight
    res.set("Access-Control-Allow-Headers", req.headers["access-control-request-headers"] || "Content-Type, Authorization");
    res.set("Access-Control-Max-Age", "86400");
    return res.sendStatus(204);
  }
  
  next();
});

app.use(express.json());

app.use("/api/apps", appsRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// CORS test endpoint
app.get("/api/cors-test", (req, res) => {
  res.json({
    message: "CORS is working!",
    origin: req.get("origin"),
    timestamp: new Date().toISOString()
  });
});

function getLocalIP(): string {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
}

app.listen(PORT, "0.0.0.0", () => {
  const localIP = getLocalIP();
  console.log(`\n  🏢 OfficeHub API Server`);
  console.log(`  ├─ Local:   http://localhost:${PORT}`);
  console.log(`  └─ Network: http://${localIP}:${PORT}\n`);
});