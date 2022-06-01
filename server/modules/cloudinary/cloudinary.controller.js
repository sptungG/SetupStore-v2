const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");
const { NOT_FOUND_IMG } = require("../../common/constants");
const Image = require("./model.image");
const User = require("../user/model.user");

// req.files.file.path
exports.userUpload = async (req, res) => {
  try {
    const { imageUrl, image } = req.body;
    const public_id_v4 = uuidv4();

    let result = null;
    if (!imageUrl) {
      result = await cloudinary.uploader.upload(image, {
        public_id: public_id_v4,
        resource_type: "auto", // jpeg, png
        folder: "users",
      });
    } else {
      const foundImageUrl = await Image.findOne({ url: imageUrl }).exec();
      if (foundImageUrl) throw { status: 400, message: `${imageUrl} has been uploaded!` };
    }

    const newImage = await new Image({
      public_id: result?.public_id || public_id_v4,
      url: imageUrl || result?.secure_url || NOT_FOUND_IMG,
      modelId: foundUser._id,
      onModel: "User",
    }).save();
    res.status(200).json({
      success: true,
      data: newImage,
    });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};
exports.adminUpload = async (req, res) => {
  try {
    const { onModel } = req.query;
    const { imageUrl, image } = req.body;
    const public_id_v4 = uuidv4();
    let modelCond = {
      folderName: "products",
      onModel: "Product",
    };
    if (onModel === "Combo") {
      modelCond.folderName = "combos";
      modelCond.onModel = "Combo";
    }
    let result = null;
    if (!imageUrl) {
      result = await cloudinary.uploader.upload(image, {
        public_id: public_id_v4,
        resource_type: "auto", // jpeg, png
        folder: modelCond.folderName,
      });
    } else {
      const foundImageUrl = await Image.findOne({ url: imageUrl }).exec();
      if (foundImageUrl) throw { status: 400, message: `${imageUrl} has been uploaded!` };
    }
    const newImage = await new Image({
      public_id: result?.public_id || public_id_v4,
      url: imageUrl || result?.secure_url || NOT_FOUND_IMG,
      onModel: modelCond.onModel,
    }).save();
    res.status(200).json({
      success: true,
      data: newImage,
    });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};

exports.userRemove = async (req, res) => {
  try {
    const { imageId } = req.body;
    const foundImage = await Image.findById(imageId);
    if (!foundImage) throw { status: 404, message: `${imageId} not found!` };
    await Promise.all([
      Image.findOneAndRemove({ _id: imageId }),
      cloudinary.uploader.destroy(foundImage.public_id),
    ]);
    res.status(200).json({ success: true, data: foundImage });
  } catch (err) {
    res.status(err?.status || 400).json({
      success: false,
      err: err.message,
    });
  }
};

exports.adminRemove = async (req, res) => {
  try {
    const { imageId } = req.body;
    const foundImage = await Image.findById(imageId);
    if (!foundImage) throw { status: 404, message: `${imageId} not found!` };
    await Promise.all([
      Image.findOneAndRemove({ _id: imageId }),
      cloudinary.uploader.destroy(foundImage.public_id),
    ]);
    res.status(200).json({ success: true, data: foundImage });
  } catch (err) {
    res.status(err?.status || 400).json({
      success: false,
      err: err.message,
    });
  }
};

// exports.demoUpload = async (req, res) => {
//   try {
//     const { email } = req.user;
//     const { productId, comboId } = req.query;
//     const file = req.files.image
//     const public_id_v4 = uuidv4();

//     const foundUser = await User.findOne({ email }).exec();
//     if (!foundUser) throw { status: 404, message: `${email} not found` };
//     if (["deleted", "inactive"].includes(foundUser.status))
//       throw { status: 400, message: `${email} is inactive` };

//     let result = await cloudinary.uploader.upload(file.tempFilePath, {
//       public_id: public_id_v4,
//       resource_type: "auto", // jpeg, png
//       folder: "products",
//     });

//     const newImage = await new Image({
//       public_id: result.public_id || public_id_v4,
//       url: result.secure_url || NOT_FOUND_IMG,
//       modelId: productId,
//       onModel: "Product",
//     }).save();
//     res.status(200).json({
//       success: true,
//       data: newImage,
//     });
//   } catch (err) {
//     res.status(400).json({ success: false, err: err.message });
//   }
// };
