const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");
// controllers

// routes
router.get("/analytics", authCheck, adminCheck, (req, res) => {
  res.json("analytics");
});

module.exports = router;
