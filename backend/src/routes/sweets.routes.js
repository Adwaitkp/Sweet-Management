const express = require("express");
const router = express.Router();

let sweets = [];

router.get("/", (req, res) => {
  res.status(200).json(sweets);
});

let idCounter = 1;

router.post("/", (req, res) => {
  const sweet = { id: idCounter++, ...req.body };
  sweets.push(sweet);
  res.status(201).json(sweet);
});

router.post("/:id/purchase", (req, res) => {
  const sweet = sweets.find(s => s.id == req.params.id);

  if (!sweet || sweet.quantity <= 0) {
    return res.status(400).json({ message: "Out of stock" });
  }

  sweet.quantity -= 1;
  res.status(200).json({ message: "Purchased" });
});

// Update a sweet by id
router.put("/:id", (req, res) => {
  const sweet = sweets.find(s => s.id == req.params.id);
  if (!sweet) {
    return res.status(404).json({ message: "Not found" });
  }
  const { name, category, price, quantity } = req.body;
  if (name !== undefined) sweet.name = name;
  if (category !== undefined) sweet.category = category;
  if (price !== undefined) sweet.price = price;
  if (quantity !== undefined) sweet.quantity = quantity;
  res.status(200).json(sweet);
});

// Delete a sweet by id
router.delete("/:id", (req, res) => {
  const idx = sweets.findIndex(s => s.id == req.params.id);
  if (idx === -1) {
    return res.status(404).json({ message: "Not found" });
  }
  sweets.splice(idx, 1);
  res.status(200).json({ message: "Deleted" });
});
module.exports = router;
