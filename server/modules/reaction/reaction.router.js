const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");
// controllers
const {
  createProductReview,
  getAllReviews,
  getFilteredProductReviews,
  getFilteredReviews,
  removeReview,
} = require("./review.controller");
const { getProductWishlistByUserId, toggleProductInWishlist } = require("./wishlist.controller");

// routes
router.post("/review", authCheck, createProductReview);
router.get("/reviews", getFilteredReviews);
router.get("/reviews/:productId", getFilteredProductReviews);
router.get("/admin/reviews", authCheck, adminCheck, getAllReviews);
router.delete("/review", authCheck, adminCheck, removeReview);

router.post("/wishlist", authCheck, toggleProductInWishlist);
router.get("/wishlist", authCheck, getProductWishlistByUserId);
router.put("/wishlist", authCheck, toggleProductInWishlist);

module.exports = router;
