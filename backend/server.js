import express from "express";
import authRoutes from "./routes/auth.route.js"

const app = express();

app.use('/api/v1/auth',authRoutes)

app.get("/", (req, res) => {
  res.send("This is a nodemon test");
});

app.listen(5000, () => {
  console.log("Server is running!");
});
