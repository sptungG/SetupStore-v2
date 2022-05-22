const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");
// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// req.files.file.path
exports.userUpload = async (req, res) => {
  try {
    const { userId } = req.query;
    let result = await cloudinary.uploader.upload(req.body.image, {
      public_id: uuidv4(),
      resource_type: "auto", // jpeg, png
      folder: "users",
    });
    res.status(200).json({
      success: true,
      data: {
        public_id: result.public_id,
        url: result.secure_url,
        uid: result.public_id,
        thumbUrl: result.secure_url,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};
exports.adminUpload = async (req, res) => {
  try {
    const { productId, userId, comboId, bannerId } = req.query;
    let folderName = "";
    if (productId) folderName = "products";
    if (userId) folderName = "users";
    if (comboId) folderName = "combos";
    if (bannerId) folderName = "banners";
    let result = await cloudinary.uploader.upload(req.body.image, {
      public_id: uuidv4(),
      resource_type: "auto", // jpeg, png
      folder: folderName,
    });
    res.status(200).json({
      success: true,
      data: {
        public_id: result.public_id,
        url: result.secure_url,
        uid: result.public_id,
        thumbUrl: result.secure_url,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};

exports.userRemove = async (req, res) => {
  try {
    let { public_id: image_id } = req.body;
    let result = await cloudinary.uploader.destroy(image_id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};

exports.adminRemove = async (req, res) => {
  try {
    let { public_id: image_id } = req.body;
    let result = await cloudinary.uploader.destroy(image_id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};
