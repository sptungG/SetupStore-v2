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

const { createVariant, removeVariants, updateVariant } = require("./variant.controller");

// routes
router.post("/product", authCheck, adminCheck, createProduct);
router.get("/products", getFilteredProducts);
router.get("/admin/products", authCheck, adminCheck, getAdminProducts);
router.get("/product/:productId", getSingleProduct);
router.put("/product", authCheck, adminCheck, updateProduct);
router.put("/product/view", viewProduct);
router.delete("/product", authCheck, adminCheck, deleteProduct);

router.post("/variant", authCheck, adminCheck, createVariant);
router.put("/variant", authCheck, adminCheck, updateVariant);
router.delete("/variant", authCheck, adminCheck, removeVariants);

module.exports = router;
