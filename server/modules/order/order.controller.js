const Order = require("./model.order");
const dayjs = require("dayjs");
const { v4: uuidv4 } = require("uuid");
const User = require("../user/model.user");
const Product = require("../product/model.product");
const Cart = require("../cart/model.cart");
const { NOT_FOUND_IMG } = require("../../common/constants");
const { convertToNumber } = require("../../common/utils");
const Variant = require("../product/model.variant");

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
            ],
          },
          { path: "variant", select: "_id price quantity options image sold status" },
        ],
      },
    ]);
    if (!foundCart) throw { status: 404, message: `Not found cart with Id:${userId}!` };

    const orderItemList = foundCart.products.map((p) => {
      return {
        saved_name: p.product.name,
        saved_quantity: p.count,
        saved_price: p.variant.price,
        saved_image:
          p.product.images.find((item) => item._id.toString() === p.variant.image.toString())
            ?.url || NOT_FOUND_IMG,
        saved_variant: p.variant.options.map((o) => `<p>${o.name}: ${o.value}</p>`),
        product: p.product,
        variant: p.variant,
      };
    });

    const { shippingInfo, shippingPrice, paymentInfo, orderNote } = req.body;

    if (
      shippingInfo == null ||
      !shippingInfo.name ||
      !shippingInfo.phoneNo ||
      !shippingInfo.address ||
      !shippingInfo.area ||
      !shippingInfo.city ||
      !shippingInfo.postalCode ||
      !shippingInfo.country
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
      paidAt: dayjs(),
      orderNote,
      orderStatus: { value: "Processing", name: "Đơn đang được xử lý" },
      orderLog: [
        {
          createdAt: dayjs(),
          content: `Đặt hàng thành công`,
          createdBy: userId,
        },
      ],
      createdBy: userId,
    }).save();

    const updatedPromisesResult = await Promise.all([
      User.findByIdAndUpdate(userId, { $push: { history: newOrder._id } }, { new: true }),
      Cart.findByIdAndUpdate(foundCart._id, { products: [], cartTotal: 0 }, { new: true }),
    ]);

    res.status(200).json({
      success: true,
      data: newOrder,
      extra: updatedPromisesResult,
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
    const { _id: userId } = req.user;
    const foundOrders = await Order.find({ createdBy: userId });

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
    const { sort } = req.query;
    let sortCondition = {};

    if (sort) {
      const [sortField, sortDirection] = sort.split("_");
      if (sortField && sortDirection) {
        sortCondition[sortField] = sortDirection === "desc" ? -1 : 1;
      }
    }
    const foundOrders = await Order.find().sort(sort ? sortCondition : { createdAt: -1 });

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

exports.cancelMyOrder = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { orderId } = req.params;
    const { orderContentNote } = req.body;
    let foundOrder = await Order.findById(orderId);
    let currentStatus = foundOrder.orderStatus.value;

    if (currentStatus !== "Processing")
      throw { status: 400, message: `Failed Cancelled Processed Order:${orderId}` };

    foundOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        orderStatus: {
          value: "Cancelling",
          name: "Đang hủy đơn",
        },
        $push: {
          orderLog: {
            content: `Gửi yêu cầu hủy đơn thành công. ${orderContentNote}`,
            createdAt: dayjs(),
            createdBy: userId,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: foundOrder,
      currentStatus: "Cancelling",
    });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};
exports.updateOrder = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { orderId } = req.params;
    const { statusName, statusValue, orderLogContent } = req.body;
    let foundOrder = await Order.findById(orderId);
    let currentStatus = foundOrder.orderStatus.value;

    if (currentStatus === "Delivered") throw { status: 400, message: `Order:${orderId} delivered` };

    if (currentStatus === "Cancelled") throw { status: 400, message: `Order:${orderId} cancelled` };

    if (statusValue === "Delivered") {
      await Promise.all(
        foundOrder.orderItems.map((item) =>
          updateVariantProductQuantity(item.variant, item.saved_quantity)
        )
      );
    }

    foundOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        orderStatus: {
          value: statusValue,
          name: statusName,
        },
        deliveredAt: dayjs(),
        $push: {
          orderLog: {
            content: orderLogContent,
            createdAt: dayjs(),
            createdBy: userId,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: foundOrder,
      currentStatus: statusValue,
    });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

async function updateVariantProductQuantity(id, quantity) {
  const foundVariant = await Variant.findById(id);

  // foundVariant.quantity = foundVariant.quantity - quantity;
  foundVariant.sold = foundVariant.sold + quantity;

  await foundVariant.save({ validateBeforeSave: false });
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
            ],
          },
          { path: "variant", select: "_id price quantity options image sold status" },
        ],
      },
    ]);
    if (!foundCart) throw { status: 404, message: `Not found cart with Id:${userId}!` };

    const orderItemList = foundCart.products.map((p) => {
      return {
        saved_name: p.product.name,
        saved_quantity: p.count,
        saved_price: p.variant.price,
        saved_image:
          p.product.images.find((item) => item._id.toString() === p.variant.image.toString())
            ?.url || NOT_FOUND_IMG,
        saved_variant: p.variant.options.map((o) => `<p>${o.name}: ${o.value}</p>`),
        product: p.product,
        variant: p.variant,
      };
    });

    const { shippingInfo, shippingPrice, orderNote } = req.body;

    if (
      shippingInfo == null ||
      !shippingInfo.name ||
      !shippingInfo.phoneNo ||
      !shippingInfo.address ||
      !shippingInfo.area ||
      !shippingInfo.city ||
      !shippingInfo.postalCode ||
      !shippingInfo.country
    )
      throw { status: 400, message: `Invalid shipping info!` };

    const shippingPriceNumber = convertToNumber(shippingPrice);

    const newOrder = await new Order({
      orderItems: orderItemList,
      shippingInfo,
      itemsPrice: foundCart.cartTotal,
      shippingPrice: shippingPriceNumber,
      totalPrice: foundCart.cartTotal + shippingPriceNumber,
      paymentInfo: { id: uuidv4(), status: "Cash On Delivery" },
      paidAt: dayjs(),
      orderNote,
      orderStatus: { value: "Processing", name: "Đơn đang được xử lý" },
      orderLog: [
        {
          createdAt: dayjs(),
          content: `Đặt hàng thành công`,
          createdBy: userId,
        },
      ],
      createdBy: userId,
    }).save();

    const updatedPromisesResult = await Promise.all([
      User.findByIdAndUpdate(userId, { $push: { history: newOrder._id } }, { new: true }),
      Cart.findByIdAndUpdate(foundCart._id, { products: [], cartTotal: 0 }, { new: true }),
    ]);

    res.status(200).json({
      success: true,
      data: newOrder,
      extra: updatedPromisesResult,
    });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};
