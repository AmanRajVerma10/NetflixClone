import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";

import { envVars } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middlewares/protectRoute.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);

app.get("/", (req, res) => {
  res.send("This is a nodemon test");
});

app.listen(envVars.PORT, () => {
  console.log("Server is running!");
  connectDB();
});
