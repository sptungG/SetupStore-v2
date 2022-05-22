const Wishlist = require("./model.wishlist");
const User = require("../user/model.user");
const Product = require("../product/model.product");

// getWishlistByUserId
exports.getProductWishlistByUserId = async (req, res) => {
  const { userId } = req.query;
  const foundProductInWishlist = await Wishlist.find({
    createdBy: userId,
  });
  return res.status(200).json({
    success: true,
    data: foundProductInWishlist,
  });
};

// toggleProductInWishlist
exports.toggleProductInWishlist = async (req, res) => {
  const { email } = req.user;
  const { productId } = req.query;

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) return res.status(404).json({ err: `${email} not found!` });
  if (["deleted", "inactive"].includes(foundUser.status))
    return res.status(401).json({ err: `${email} is inactive` });

  const foundProduct = await Product.findOne({ _id: productId });
  if (!foundProduct) return res.status(404).json({ err: `${productId} not found!` });
  if (["deleted", "inactive"].includes(foundProduct.status))
    return res.status(400).json({ err: `${productId} is inactive!` });

  const foundProductInWishlist = await Wishlist.find({
    product: productId,
    createdBy: foundUser._id,
  });
  if (foundProductInWishlist.length === 0) {
    const newProductInWishlist = await new Wishlist({
      product: productId,
      createdBy: foundUser._id,
    }).save();

    await User.findByIdAndUpdate(foundUser._id, { $push: { wishlist: productId } }, { new: true });
    await Product.findByIdAndUpdate(
      productId,
      { $push: { wishlist: foundUser._id } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      data: newProductInWishlist,
    });
  } else {
    const [foundWishlist] = foundProductInWishlist;
    const removedProductFromWishlist = await Wishlist.findByIdAndRemove(foundWishlist._id);
    await User.findByIdAndUpdate(foundUser._id, { $pull: { wishlist: productId } }, { new: true });
    await Product.findByIdAndUpdate(
      productId,
      { $pull: { wishlist: foundUser._id } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      data: removedProductFromWishlist,
    });
  }
};
