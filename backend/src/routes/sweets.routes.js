const express = require("express");
const router = express.Router();

let sweets = [];

router.get("/", (req, res) => {
  res.status(200).json(sweets);
});

router.post("/", (req, res) => {
  const sweet = req.body;
  sweets.push(sweet);
  res.status(201).json(sweet);
});

module.exports = router;
