const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");
// controllers

// routes
router.get("/order", authCheck, (req, res) => {
  res.json("order");
});

module.exports = router;
