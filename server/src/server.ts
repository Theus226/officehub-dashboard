import express from "express";
import cors from "cors";
import { networkInterfaces } from "os";
import appsRouter from "./routes/apps";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Manual CORS headers - highest priority
app.use((req, res, next) => {
  const origin = req.headers.origin || "*";
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  next();
});

// Additional CORS middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: false,
  optionsSuccessStatus: 200
}));

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