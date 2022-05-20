const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");
// controllers
const {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
} = require("./category.controller");
// routes
router.post("/category", authCheck, adminCheck, createCategory);
router.get("/categories", getAllCategory);
router.get("/category/:id", getCategoryById);
router.put("/category/:id", authCheck, adminCheck, updateCategory);
router.delete("/category/:id", authCheck, adminCheck, deleteCategory);

module.exports = router;
