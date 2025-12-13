const bcrypt = require("bcrypt");
const User = require("../models/User");

async function seedAdmin() {
  const adminExists = await User.findOne({ email: "admin@example.com" });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin"
    });
    console.log("Default admin created: admin@example.com / admin123");
  }
}

module.exports = seedAdmin;
