import express, { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connDB } from "./lib/db.js";
import { inngest, functions } from "./lib/ingest.js";
import { serve } from "inngest/express";
import { clerkMiddleware } from '@clerk/express'
import authUser from "../middleware/authUser.js";
import chatRouter from "../Router/chatRouter.js"; 

dotenv.config();

const app = express();
app.use(clerkMiddleware()); //used for user authetication
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://doniv-123.onrender.com"
  ],
  credentials: true
}));

app.use('/api/inngest', serve({ client: inngest, functions }));
app.use('/api/chat', chatRouter)

app.get("/", (req, res) => {
  res.status(200).json({ message: "Success from API__" });
});

// app.get('/call',authUser, async(req,res)=>{
//   res.status(200).json({msg:'call endpoint'});
// })

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