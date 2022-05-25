const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");

// controllers
const { adminRemove, adminUpload, userRemove, userUpload} = require("./cloudinary.controller");

router.post("/uploadimages", authCheck, userUpload);
router.delete("/removeimage", authCheck, userRemove);
router.post("/admin/uploadimages", authCheck, adminCheck, adminUpload);
router.delete("/admin/removeimage", authCheck, adminCheck, adminRemove);

module.exports = router;
