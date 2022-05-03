const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");
// controllers

// routes
router.get("/product", authCheck, (req, res) => {
  res.json("product");
});

module.exports = router;
