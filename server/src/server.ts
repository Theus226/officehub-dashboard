import express from "express";
import { networkInterfaces } from "os";
import appsRouter from "./routes/apps";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// CORS Configuration - Allow all origins
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

app.use("/api/apps", appsRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
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