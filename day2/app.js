import express from 'express'
const app=express()

import  userRoutes from "./routes/userRoute.js";
import  authRoutes from "./routes/authRoutes.js";


app.use(express.json()); // Important
app.use("/auth",authRoutes)
app.use("/user", userRoutes);


app.listen(3000, () => {
  console.log("Server running on port 3000");
});