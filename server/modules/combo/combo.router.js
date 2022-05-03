const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");
// controllers

// routes
router.get("/combo", authCheck, (req, res) => {
  res.json("combo");
});

module.exports = router;
