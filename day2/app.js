import express from 'express'
import path from 'path'
const app=express()

import  userRoutes from "./routes/userRoute.js";
import  authRoutes from "./routes/authRoutes.js";
import  uploadRoutes from "./routes/uploadRoutes.js"


app.use(express.json()); // Important
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use('/upload',uploadRoutes)
app.use("/auth",authRoutes)
app.use("/user", userRoutes);


app.listen(3000, () => {
  console.log("Server running on port 3000");
});