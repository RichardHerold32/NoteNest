import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Core middleware
app.use(express.json());

//cors
app.use(cors(
  {
    origin: 'http://localhost:5173'
  }
))

// Rate limiting (can be scoped later)
app.use(rateLimiter);

// Routes
app.use("/api/notes", notesRoutes);


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


//mongodb+srv://richardherold666_db_user:richard_db_user@cluster0.e8n8oqj.mongodb.net/?appName=Cluster0