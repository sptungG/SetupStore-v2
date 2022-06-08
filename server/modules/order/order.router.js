const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck, isAuthenticatedUser } = require("../auth/auth.validation");
// controllers
const {
  createOrder,
  getSingleOrder,
  getAllOrders,
  getMyOrders,
  updateOrder,
  deleteOrder,
  createCashOrder,
} = require("./order.controller");
const { processPayment, sendStripeApi } = require("./payment.controller");
// routes
router.get("/orders", authCheck, isAuthenticatedUser, getMyOrders);
router.get("/admin/orders", authCheck, adminCheck, getAllOrders);
router.get("/admin/order/:orderId", authCheck, adminCheck, getSingleOrder);
router.post("/order", authCheck, isAuthenticatedUser, createOrder);
router.post("/order/cod", authCheck, isAuthenticatedUser, createCashOrder);
router.put("/admin/order/:orderId", authCheck, adminCheck, updateOrder);
router.delete("/admin/order/:orderId", authCheck, adminCheck, deleteOrder);

router.post("/payment/process", authCheck, isAuthenticatedUser, processPayment);
router.get("/stripeapi", authCheck, isAuthenticatedUser, sendStripeApi);

module.exports = router;
