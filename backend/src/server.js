import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
const CORS_ORIGIN = process.env.CORS_ORIGIN;

// Core middleware
app.use(express.json());

// CORS: use explicit origin when provided, otherwise allow requests.
if (CORS_ORIGIN) {
  const origins = CORS_ORIGIN.split(",").map((origin) => origin.trim());
  app.use(cors({ origin: origins }));
} else {
  app.use(cors());
}

// Rate limiting (can be scoped later)
app.use(rateLimiter);

// Routes
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // SPA fallback for non-API GET requests (works across Express versions).
  app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start server AFTER DB connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  });


