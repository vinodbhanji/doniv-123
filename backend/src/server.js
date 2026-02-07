import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serve from "@inngest/express";
import { functions } from "./models/ingest.js";
import {connDB} from './lib/db.js'
import { inngest } from "../models/ingest.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://doniv-123.onrender.com"
  ],
  // credentials: true is needed if you want to send cookies or use authentication headers to be sent in cross-origin requests. It allows the browser to include credentials in the requests to the specified origins.
  credentials: true
}))

app.use('/api/inngest', serve({client:inngest, functions }));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Success from API__" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connDB();   // first DB
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server Error:", error);
    process.exit(1);
  }
};

startServer();