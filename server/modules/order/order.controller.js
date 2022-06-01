const Order = require("./model.order");
const User = require("../user/model.user");
const Product = require("../product/model.product");

exports.createOrder = async (req, res) => {
  try {
    const { orderItems, shippingInfo, itemsPrice, shippingPrice, totalPrice, paymentInfo } =
      req.body;

    const order = await new Order({
      orderItems,
      shippingInfo,
      itemsPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
      paidAt: Date.now(),
      user: req.user._id,
    }).save();

    res.status(200).json({
      success: true,
      data: order,
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
    const foundOrder = await Order.findById(orderId);

    if (foundOrder.orderStatus === "Delivered")
      throw { status: 400, message: `You have already delivered this order:${orderId}` };

    foundOrder.orderItems.forEach(async (item) => {
      await updateProductQuantity(item.product, item.quantity);
    });

    (foundOrder.orderStatus = req.body.status), (foundOrder.deliveredAt = Date.now());

    await foundOrder.save();

    res.status(200).json({
      success: true,
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
    const foundOrder = await Order.findById(req.params.id);

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

exports.createCashOrder = async (req, res) => {};
