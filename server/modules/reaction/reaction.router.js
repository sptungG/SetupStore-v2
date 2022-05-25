const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");
// controllers
const {
  createProductReview,
  getAllReviews,
  getFilteredProductReviews,
  getFilteredComboReviews,
  getFilteredReviews,
  removeReview,
} = require("./review.controller");
const {
  getWishlistByUserId,
  toggleProductInWishlist,
  toggleComboInWishlist,
} = require("./wishlist.controller");

// routes
router.post("/review", authCheck, createProductReview);
router.get("/reviews", getFilteredReviews);
router.get("/product/:productId/reviews", getFilteredProductReviews);
router.get("/combo/:comboId/reviews", getFilteredComboReviews);
router.get("/admin/reviews", authCheck, adminCheck, getAllReviews);
router.delete("/admin/review", authCheck, adminCheck, removeReview);

router.get("/wishlist", authCheck, getWishlistByUserId);
router.put("/wishlist/product", authCheck, toggleProductInWishlist);
router.put("/wishlist/combo", authCheck, toggleComboInWishlist);

module.exports = router;
