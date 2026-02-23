import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
const app=express()

import  authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import internRoutes from './routes/internRoutes.js'

app.use(express.json()); 
dotenv.config()
app.use("/upload", express.static(path.join(process.cwd(), "upload")));

app.use("/api/auth", authRoutes);
app.use("/api/interns", internRoutes);
app.use("/api/tasks", taskRoutes);


app.listen(3000, () => {
  console.log("Server running on port 3000");
});