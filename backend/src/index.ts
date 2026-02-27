import dotenv from "dotenv";
import { resolve } from "path";
import { existsSync } from "fs";

// Load .env file
// Supports both monorepo root and standalone repo root
const rootEnv = resolve(process.cwd(), ".env");
const parentEnv = resolve(import.meta.dirname, "../../.env");

if (existsSync(rootEnv)) dotenv.config({ path: rootEnv });
else if (existsSync(parentEnv)) dotenv.config({ path: parentEnv });
else dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import apiRoutes from "./routes/api.js";
import mockApiRoutes from "./mock-apis/externalServices.js";

const app = express();
const PORT = parseInt(process.env.BACKEND_PORT || "4000", 10);

// ── Middleware ──
const allowedOrigins = [
    "http://localhost:5000",
    "http://localhost:3000",
    "http://localhost:5173",
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// ── Request logging ──
app.use((req, _res, next) => {
    if (req.path.startsWith("/api")) {
        const time = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true });
        console.log(`${time} [API] ${req.method} ${req.path}`);
    }
    next();
});

// ── Routes ──
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/api/mock", mockApiRoutes);

// ── Health check ──
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "valualliance-backend", timestamp: new Date().toISOString() });
});

// ── Error handler ──
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Server Error:", err);
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// ── Start ──
async function start() {
    await connectDB();
    const HOST = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";
    app.listen(PORT, HOST, () => {
        console.log(`\n🚀 ValuAlliance Backend API running at http://localhost:${PORT}`);
        console.log(`   📦 Database API:  /api/*`);
        console.log(`   🔐 Auth API:      /api/auth/*`);
        console.log(`   🌐 Mock APIs:     /api/mock/*`);
        console.log(`   ❤️  Health:        /api/health\n`);
    });
}

start().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
