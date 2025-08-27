import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON body

// Simple test route
app.get("/", (_req, res) => {
  res.send("API is running...");
});

export default app;
