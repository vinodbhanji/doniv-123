
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connDB } from "./lib/db.js";
import { inngest, functions } from "../models/ingest.js";
import { serve } from "inngest/express";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://doniv-123.onrender.com"
  ],
  credentials: true
}));

app.use('/api/inngest', serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Success from API__" });
});

// Clerk handles authentication and user management via webhooks and frontend

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server Error:", error);
    process.exit(1);
  }
};

startServer();