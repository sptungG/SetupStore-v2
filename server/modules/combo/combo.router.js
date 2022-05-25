const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");
// controllers
const {
  createCombo,
  deleteCombo,
  getComboById,
  getFilteredCombos,
  updateCombo,
  viewCombo,
} = require("./combo.controller");
// routes
router.post("/admin/combo", authCheck, adminCheck, createCombo);
router.get("/combos", getFilteredCombos);
router.get("/combo/:comboId", getComboById);
router.put("/admin/combo/:comboId", authCheck, adminCheck, updateCombo);
router.put("/combo/:comboId/view", viewCombo);
router.delete("/admin/combo/:comboId", authCheck, adminCheck, deleteCombo);

module.exports = router;
