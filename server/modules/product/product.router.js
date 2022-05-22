const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");
// controllers
const {
  getFilteredProducts,
  createProduct,
  getSingleProduct,
  getAdminProducts,
  deleteProduct,
  updateProduct,
  viewProduct,
} = require("./product.controller");

// routes
router.post("/product", authCheck, adminCheck, createProduct);
router.get("/products", getFilteredProducts);
router.get("/admin/products", authCheck, adminCheck, getAdminProducts);
router.get("/product/:productId", getSingleProduct);
router.put("/product/:productId", authCheck, adminCheck, updateProduct);
router.put("/product/:productId/view", viewProduct);
router.delete("/product/:productId", authCheck, adminCheck, deleteProduct);

module.exports = router;
