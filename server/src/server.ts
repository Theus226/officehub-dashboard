import express from "express";
import cors from "cors";
import { networkInterfaces } from "os";
import appsRouter from "./routes/apps";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors({ origin: true, credentials: true }));
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