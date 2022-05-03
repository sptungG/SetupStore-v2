const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");
// controllers

// routes
router.get("/category", authCheck, (req, res) => {
  res.json("category");
});

module.exports = router;
