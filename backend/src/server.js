const express = require("express");
const authRoutes = require("./routes/auth.routes");
const sweetsRoutes = require("./routes/sweets.routes");
require("dotenv").config();
const cors = require("cors");

const app = express();

if (process.env.NODE_ENV !== "test") {
  const connectDB = require("./config/db");
  const seedAdmin = require("./config/seedAdmin");
  
  connectDB().then(() => seedAdmin());
}

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
