import express from "express";
import authRoutes from "./routes/auth.route.js";
import { envVars } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("This is a nodemon test");
});

app.listen(envVars.PORT, () => {
  console.log("Server is running!");
  connectDB();
});
