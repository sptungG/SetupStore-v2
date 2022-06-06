const Order = require("./model.order");
const User = require("../user/model.user");
const Product = require("../product/model.product");
const Cart = require("../cart/model.cart");
const { NOT_FOUND_IMG } = require("../../common/constants");
const { convertToNumber } = require("../../common/utils");

exports.createOrder = async (req, res) => {
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
    if (!foundCart) throw { status: 404, message: `Not found cart with Id:${userId}!` };

    const orderItemList = foundCart.products.map((p) => {
      return {
        saved_name: p.product.name,
        saved_quantity: p.count,
        saved_price: p.price,
        saved_image:
          p.product.images.find((item) => item._id.toString() === p.variant.image.toString())
            ?.url || NOT_FOUND_IMG,
        saved_variant: `${p.variant.color_label},${p.variant.color_hex_code}`,
        product: p.product,
        variant: p.variant,
      };
    });

    const { shippingInfo, shippingPrice, paymentInfo } = req.body;

    if (
      shippingInfo == null ||
      !shippingInfo?.phoneNo ||
      !shippingInfo?.address ||
      !shippingInfo?.area ||
      !shippingInfo?.city ||
      !shippingInfo?.postalCode ||
      !shippingInfo?.country
    )
      throw { status: 400, message: `Invalid shipping info!` };

    if (paymentInfo == null || !paymentInfo?.id || !paymentInfo?.status)
      throw { status: 400, message: `Invalid payment info!` };

    const shippingPriceNumber = convertToNumber(shippingPrice);

    const newOrder = await new Order({
      orderItems: orderItemList,
      shippingInfo,
      itemsPrice: foundCart.cartTotal,
      shippingPrice: shippingPriceNumber,
      totalPrice: foundCart.cartTotal + shippingPriceNumber,
      paymentInfo,
      paidAt: Date.now(),
      createdBy: userId,
    }).save();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { history: newOrder._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: newOrder,
      extra: updatedUser,
    });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

exports.getSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const foundOrder = await Order.findById(orderId).populate("createdBy", "_id name mail picture");

    if (!foundOrder) throw { status: 404, message: `No Order found with ID:${orderId}` };

    res.status(200).json({
      success: true,
      data: foundOrder,
    });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const foundOrders = await Order.find({ createdBy: req.user.id });

    res.status(200).json({
      success: true,
      data: foundOrders,
    });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const foundOrders = await Order.find();

    let totalAmount = 0;

    foundOrders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      data: foundOrders,
    });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const foundOrder = await Order.findById(orderId);
    let currentStatus = foundOrder.orderStatus;

    if (currentStatus === "Delivered")
      throw { status: 400, message: `You have already delivered this order:${orderId}` };

    if (status === "Delivered") {
      foundOrder.orderItems.forEach(async (item) => {
        await updateProductQuantity(item.product, item.saved_quantity);
      });

      (foundOrder.orderStatus = status), (foundOrder.deliveredAt = Date.now());

      await foundOrder.save();
      currentStatus = status;
    }
    res.status(200).json({
      success: true,
      data: foundOrder,
      currentStatus,
    });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

async function updateProductQuantity(id, quantity) {
  const product = await Product.findById(id);

  product.quantity = product.quantity - quantity;

  await product.save({ validateBeforeSave: false });
}

exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const foundOrder = await Order.findById(orderId);

    if (!foundOrder) throw { status: 404, message: `No Order found with ID:${orderId}` };

    await foundOrder.remove();

    res.status(200).json({
      success: true,
      data: foundOrder,
    });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

exports.createCashOrder = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    res.status(200).json({
      success: true,
      data: userId,
    });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};
