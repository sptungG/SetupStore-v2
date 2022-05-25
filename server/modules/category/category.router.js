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
router.get("/category/:categoryId", getCategoryById);
router.put("/category/:categoryId", authCheck, adminCheck, updateCategory);
router.delete("/category/:categoryId", authCheck, adminCheck, deleteCategory);

module.exports = router;
