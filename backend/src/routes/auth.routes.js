const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  return res.status(201).json({
    token: "dummy-token"
  });
});

module.exports = router;
