import express from 'express'
const app=express()

import  userRoutes from "./routes/userRoute.js";

app.use(express.json()); // Important
app.use("/api", userRoutes);


app.listen(3000, () => {
  console.log("Server running on port 3000");
});