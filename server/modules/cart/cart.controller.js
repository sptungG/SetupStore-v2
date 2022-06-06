const Cart = require("./model.cart");
const Product = require("../product/model.product");
const Variant = require("../product/model.variant");
const User = require("../user/model.user");
const { convertToNumber } = require("../../common/utils");

exports.addProductToCart = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { productId, variantId, quantity } = req.body;
    let quantityNumber = convertToNumber(quantity);
    const foundProduct = await Product.findById(productId);
    const foundVariant = await Variant.findById(variantId);
    if (!foundProduct) throw { status: 404, message: `Product:${productId} not found!` };
    if (!foundVariant) throw { status: 404, message: `Variant:${variantId} not found!` };
    if (foundProduct.quantity < quantityNumber)
      throw {
        status: 400,
        message: `Exceed maximum quantity ${foundProduct.quantity} of Product:${productId}!`,
      };

    let newCart = null;
    const foundCart = await Cart.findOne({ createdBy: userId });
    if (!foundCart) {
      newCart = await new Cart({
        products: [
          {
            product: productId,
            variant: variantId,
            count: quantityNumber,
            price: foundProduct.price,
          },
        ],
        cartTotal: foundProduct.price * quantityNumber,
        createdBy: userId,
      }).save();
    } else {
      const foundProductInCart = foundCart.products.find(
        (p) => p.product.toString() === productId && p.variant.toString() === variantId
      );
      if (!foundProductInCart) {
        const newProduct = {
          product: productId,
          variant: variantId,
          count: quantityNumber,
          price: foundProduct.price,
        };
        newCart = await Cart.findByIdAndUpdate(
          foundCart._id,
          {
            $push: { products: newProduct },
            $inc: { cartTotal: newProduct.price * quantityNumber },
          },
          { new: true }
        );
      } else {
        const newProducts = foundCart.products.map((p) => {
          if (p.product.toString() === productId && p.variant.toString() === variantId) {
            return { ...p, count: (p.count += quantityNumber) };
          }
          return p;
        });
        newCart = await Cart.findByIdAndUpdate(
          foundCart._id,
          {
            $set: { products: newProducts },
            $inc: { cartTotal: foundProduct.price * quantityNumber },
          },
          { new: true }
        );
      }
    }
    if (newCart == null) throw { status: 400, message: `Failed to add Product:${productId}!` };

    // const updatedProduct = await Product.findByIdAndUpdate(
    //   productId,
    //   { $inc: { quantity: -quantityNumber } },
    //   { new: true }
    // );
    const updatedUser = await User.findByIdAndUpdate(userId, { cart: newCart._id }, { new: true });
    res.status(200).json({ success: true, data: newCart, extra: updatedUser });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const foundCart = await Cart.findOne({ createdBy: userId }).populate([
      {
        path: "products",
        populate: [
          {
            path: "product",
            model: "Product",
            populate: [
              { path: "category", select: "_id name" },
              { path: "images", select: "_id public_id url modelId onModel" },
              { path: "wishlist", select: "_id name picture" },
              { path: "variants", select: "_id color_label color_hex_code image" },
            ],
          },
          { path: "variant", select: "_id color_label color_hex_code image" },
        ],
      },
    ]);
    res.status(200).json({ success: true, data: foundCart });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

exports.removeProductFromCart = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { productId, variantId } = req.body;
    const foundProduct = await Product.findById(productId);
    const foundVariant = await Variant.findById(variantId);
    if (!foundProduct) throw { status: 404, message: `Product:${productId} not found!` };
    if (!foundVariant) throw { status: 404, message: `Variant:${variantId} not found!` };

    const foundCart = await Cart.findOne({ createdBy: userId });
    if (!foundCart) throw { status: 404, message: `Cart:${userId} not found!` };

    const foundProductInCart = foundCart.products.find(
      (p) => p.product.toString() === productId && p.variant.toString() === variantId
    );
    if (foundProductInCart) {
      const updatedCart = await Cart.findOneAndUpdate(
        { _id: foundCart._id },
        {
          $pull: {
            products: {
              product: productId,
              variant: variantId,
            },
          },
          $inc: { cartTotal: -(foundProductInCart.price * foundProductInCart.count) },
        },
        { new: true }
      );
      // const updatedProduct = await Product.findByIdAndUpdate(
      //   foundProductInCart.product,
      //   { $inc: { quantity: foundProductInCart.count } },
      //   { new: true }
      // );
      res.status(200).json({ success: true, data: updatedCart });
    } else
      throw {
        status: 404,
        message: `Product:${productId}-Variant:${variantId} not found in Cart:${userId}!`,
      };
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};
