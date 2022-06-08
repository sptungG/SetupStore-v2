const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const Order = require("../order/model.order");
const Product = require("../product/model.product");
const User = require("../user/model.user");

dayjs.extend(customParseFormat);
const DAYJS_FORMAT = "DD-MM-YYYY";
const getDateFormat = (date) => {
  if (!date || !dayjs(date, DAYJS_FORMAT).isValid()) return null;
  return dayjs(date, DAYJS_FORMAT).add(1, "day").toDate();
};

const checkIsBeforeDate = (date1, date2) => {
  if (date1 && date2) return dayjs(date1).isBefore(dayjs(date2));
  return false;
};

exports.getProductVariantsStats = async (req, res) => {
  let { begin, end } = req.query;

  let filter = {};
  begin = getDateFormat(begin);
  end = getDateFormat(end);
  if (!checkIsBeforeDate(begin, end)) end = null;

  if (begin && end) {
    filter.createdAt = {
      $gte: begin,
      $lte: end,
    };
  } else if (end) {
    filter.createdAt = { $lte: end };
  } else if (begin) {
    filter.createdAt = { $gte: begin };
  } else {
    filter.createdAt = { $gte: dayjs().subtract(1, "month").toDate() };
  }
  try {
    const data = await Order.aggregate([
      {
        $match: filter,
      },
      {
        $unwind: "$orderItems",
      },
      {
        $project: {
          saved_variant: "$orderItems.saved_variant",
          saved_quantity: "$orderItems.saved_quantity",
          saved_price: "$orderItems.saved_price",
          orderItemsPrice: "$itemsPrice",
          orderShippingPrice: "$shippingPrice",
          orderTotalPrice: "$totalPrice",
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
        },
      },
      { $sort: { date: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data,
      range: [filter.createdAt["$gte"], filter.createdAt["$lte"]],
    });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};

exports.getIncomeStats = async (req, res) => {
  let { productId, begin, end } = req.query;

  let filter = {};
  begin = getDateFormat(begin);
  end = getDateFormat(end);
  if (!checkIsBeforeDate(begin, end)) end = null;

  if (begin && end) {
    filter.createdAt = {
      $gte: begin,
      $lte: end,
    };
  } else if (end) {
    filter.createdAt = { $lte: end };
  } else if (begin) {
    filter.createdAt = { $gte: begin };
  } else {
    filter.createdAt = { $gte: dayjs().subtract(1, "month").toDate() };
  }
  if (productId) {
    const foundProduct = await Product.findOne({ _id: productId });
    filter._product = foundProduct._id;
  }
  try {
    const data = await Order.aggregate([
      {
        $unwind: "$orderItems",
      },
      {
        $addFields: {
          _product: "$orderItems.product",
        },
      },
      {
        $match: filter,
      },
      {
        $project: {
          orderItemsPrice: "$itemsPrice",
          orderShippingPrice: "$shippingPrice",
          orderTotalPrice: "$totalPrice",
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
        },
      },
      {
        $group: {
          _id: "$date",
          total: { $sum: "$orderTotalPrice" },
        },
      },
      { $sort: { date: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data,
      range: [filter.createdAt["$gte"], filter.createdAt["$lte"]],
    });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};

exports.getUsersStats = async (req, res) => {
  let { begin, end } = req.query;

  let filter = {};
  begin = getDateFormat(begin);
  end = getDateFormat(end);
  if (!checkIsBeforeDate(begin, end)) end = null;

  if (begin && end) {
    filter.createdAt = {
      $gte: begin,
      $lte: end,
    };
  } else if (end) {
    filter.createdAt = { $lte: end };
  } else if (begin) {
    filter.createdAt = { $gte: begin };
  } else {
    filter.createdAt = { $gte: dayjs().subtract(1, "month").toDate() };
  }

  try {
    const data = await User.aggregate([
      { $match: filter },
      {
        $project: {
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
        },
      },
      {
        $group: {
          _id: "$date",
          total: { $sum: 1 },
        },
      },
      { $sort: { date: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: data,
      range: [filter.createdAt["$gte"], filter.createdAt["$lte"]],
    });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};
