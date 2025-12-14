const express = require("express");
const { adminOnly, verifyJWT } = require("../middleware/auth");
const Sweet = require("../models/Sweet");
const router = express.Router();

// Get all sweets (Protected)
router.get("/", verifyJWT, async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Add a new sweet (Protected - Admin only)
router.post("/", verifyJWT, adminOnly, async (req, res) => {
  try {
    const { name, category, price, quantity, weight } = req.body;
    const sweet = new Sweet({ name, category, price, quantity, weight });
    await sweet.save();
    res.status(201).json(sweet);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Purchase a sweet (Protected)
router.post("/:id/purchase", verifyJWT, async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet || sweet.quantity <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }
    sweet.quantity -= 1;
    await sweet.save();
    res.status(200).json({ message: "Purchased" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Restock a sweet (Admin only)
router.post("/:id/restock", verifyJWT, adminOnly, async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: "Not found" });
    }
    const amount = Number((req.body && req.body.amount) ?? 0);
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid restock amount" });
    }
    sweet.quantity += amount;
    await sweet.save();
    res.status(200).json({ message: "Restocked", quantity: sweet.quantity });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Search sweets by name, category, or price range (Protected)
router.get("/search", verifyJWT, async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    
    let query = {};
    
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (category) {
      query.category = { $regex: `^${category}$`, $options: "i" };
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) query.price.$lte = Number(maxPrice);
    }
    
    const sweets = await Sweet.find(query);
    res.status(200).json(sweets);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update a sweet by id (Admin only)
router.put("/:id", verifyJWT, adminOnly, async (req, res) => {
  try {
    const { name, category, price, quantity, weight } = req.body;
    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      { name, category, price, quantity, weight },
      { new: true }
    );
    if (!sweet) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(sweet);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete a sweet by id (Admin only)
router.delete("/:id", verifyJWT, adminOnly, async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
