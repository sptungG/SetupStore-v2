const Wishlist = require("./model.wishlist");
const User = require("../user/model.user");
const Product = require("../product/model.product");

// getWishlistByUserId
exports.getProductWishlistByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    const foundProductInWishlist = await Wishlist.find({
      createdBy: userId,
    });
    return res.status(200).json({
      success: true,
      data: foundProductInWishlist,
    });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

// toggleProductInWishlist
exports.toggleProductInWishlist = async (req, res) => {
  try {
    const { email } = req.user;
    const { productId } = req.query;

    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) throw { status: 404, message: `${email} not found` };
    if (["deleted", "inactive"].includes(foundUser.status))
      throw { status: 400, message: `${email} is inactive` };

    const foundProduct = await Product.findOne({ _id: productId });
    if (!foundProduct) throw { status: 404, message: `${productId} not found!` };
    if (["deleted", "inactive"].includes(foundProduct.status))
      throw { status: 400, message: `${productId} is inactive!` };

    const foundProductInWishlist = await Wishlist.find({
      product: productId,
      createdBy: foundUser._id,
    });
    if (foundProductInWishlist.length === 0) {
      const newProductInWishlist = await new Wishlist({
        product: productId,
        createdBy: foundUser._id,
      }).save();

      await Promise.all(
        User.findByIdAndUpdate(foundUser._id, { $push: { wishlist: productId } }, { new: true }),
        Product.findByIdAndUpdate(productId, { $push: { wishlist: foundUser._id } }, { new: true })
      );

      return res.status(200).json({
        success: true,
        data: newProductInWishlist,
      });
    } else {
      const [foundWishlist] = foundProductInWishlist;
      const removedProductFromWishlist = await Wishlist.findByIdAndRemove(foundWishlist._id);
      await Promise.all(
        User.findByIdAndUpdate(foundUser._id, { $pull: { wishlist: productId } }, { new: true }),
        Product.findByIdAndUpdate(productId, { $pull: { wishlist: foundUser._id } }, { new: true })
      );
      return res.status(200).json({
        success: true,
        data: removedProductFromWishlist,
      });
    }
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};
