const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");

// controllers
const { adminRemove, adminUpload, userRemove, userUpload} = require("./cloudinary.controller");

router.post("/uploadimages", authCheck, userUpload);
router.post("/removeimage", authCheck, userRemove);
router.post("/admin/uploadimages", authCheck, adminCheck, adminUpload);
router.post("/admin/removeimage", authCheck, adminCheck, adminRemove);

module.exports = router;
