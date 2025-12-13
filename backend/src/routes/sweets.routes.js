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
module.exports = router;
