import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();
const configuredOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const localDevOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/;

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser requests and local development ports (5173/5174/etc).
      if (!origin || configuredOrigins.includes(origin) || localDevOriginPattern.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    }
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "portfolio-management-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/profile", profileRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
