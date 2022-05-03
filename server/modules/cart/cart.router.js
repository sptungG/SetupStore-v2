const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");
// controllers

// routes
router.get("/cart", authCheck, (req, res) => {
  res.json("cart");
});

module.exports = router;
