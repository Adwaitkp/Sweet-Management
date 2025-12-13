const express = require("express");
const authRoutes = require("./routes/auth.routes");
require("dotenv").config();
const sweetsRoutes = require("./routes/sweets.routes");


const app = express();

if (process.env.NODE_ENV !== "test") {
  const connectDB = require("./config/db");
  connectDB();
}

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);

module.exports = app;
