const express = require("express");
const authRoutes = require("./routes/auth.routes");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);

module.exports = app;
