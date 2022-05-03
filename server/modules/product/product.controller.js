exports.getFilteredProducts = async (req, res) => {
  let orders = await Product.find({})
    .populate("products.product")
    .populate("orderedBy", "_id name picture area address")
    .sort([["createdAt", "desc"]])
    .exec();

  res.json(orders);
};

exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  let updated = await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true }).exec();

  res.json(updated);
};
