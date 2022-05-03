const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");
// controllers

// routes
router.get("/reaction", authCheck, (req, res) => {
  res.json("reaction");
});

module.exports = router;
