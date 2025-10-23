// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./database/db.js"; // ✅ points to database folder

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server running..."));
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
