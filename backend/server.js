import express from "express";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import { envVars } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);


app.get("/", (req, res) => {
  res.send("This is a nodemon test");
});

app.listen(envVars.PORT, () => {
  console.log("Server is running!");
  connectDB();
});
