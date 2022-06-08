const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck, isAuthenticatedUser } = require("../auth/auth.validation");
// controllers
const { getAllUsers, getUser, removeUser, updateUser,updateMyInfo } = require("./user.controller");
// routes
router.get("/admin/users", authCheck, adminCheck, getAllUsers);
router.get("/admin/user/:userId", authCheck, adminCheck, getUser);
router.put("/user/:userId", authCheck, isAuthenticatedUser, updateMyInfo);
router.put("/admin/user/:userId", authCheck, adminCheck, updateUser);
router.delete("/admin/user/:userId", authCheck, adminCheck, removeUser);

module.exports = router;
