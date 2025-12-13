const express = require("express");
const authRoutes = require("./routes/auth.routes");
require("dotenv").config();

const app = express();

if (process.env.NODE_ENV !== "test") {
  const connectDB = require("./config/db");
  connectDB();
}

app.use(express.json());
app.use("/api/auth", authRoutes);

module.exports = app;
