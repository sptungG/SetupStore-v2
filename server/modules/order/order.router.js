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
// routes
router.get("/orders", authCheck, isAuthenticatedUser, getMyOrders);
router.get("/admin/orders", authCheck, adminCheck, getAllOrders);
router.get("/admin/order/:orderId", authCheck, adminCheck, getSingleOrder);
router.post("/order", authCheck, isAuthenticatedUser, createOrder);
router.post("/order/cod", authCheck, isAuthenticatedUser, createCashOrder);
router.put("/admin/order/:orderId", authCheck, adminCheck, updateOrder);
router.delete("/admin/order/:orderId", authCheck, adminCheck, deleteOrder);

module.exports = router;
