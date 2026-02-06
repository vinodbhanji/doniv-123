import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connDB} from './lib/db.js'

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: "https://doniv-123.onrender.com",
  credentials: true
}));

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