const { convertToNumber } = require("../../common/utils");
const Product = require("./model.product");

// getFilteredProducts (pagination, sort, search)
exports.getFilteredProducts = async (req, res) => {
  const { status, rating, price, keyword, page, limit, sort } = req.query;
  const currentPage = page || 1;

  const limitNumber = limit && Number(limit) ? Number(limit) : 4;

  let filter = {};
  let sortCondition = {};

  if (status) {
    filter.status = status;
  }

  if (rating) {
    filter.avgRating = { $gte: convertToNumber(rating) };
  }

  if (price) {
    let [minPrice, maxPrice] = price.split(",");
    minPrice = convertToNumber(minPrice);
    maxPrice = convertToNumber(maxPrice);
    let priceCondition = {};
    priceCondition["$gte"] = minPrice;
    if (maxPrice > minPrice) priceCondition["$lte"] = maxPrice;
    filter.price = priceCondition;
  }

  if (sort) {
    const [sortField, sortDirection] = sort.split("_");
    if (sortField && sortDirection) {
      sortCondition[sortField] = sortDirection === "desc" ? -1 : 1;
    }
  }

  if (keyword) {
    const regex = new RegExp(`${keyword}`, "i");
    const regexCond = { $regex: regex };
    console.log(regexCond);
    filter["$or"] = [{ name: regexCond }, { desc: regexCond }];
  }

  const [products, totalProduct] = await Promise.all([
    Product.find(filter)
      .populate("category", "_id name")
      .populate("wishlist", "_id name picture")
      .skip((currentPage - 1) * limitNumber)
      .limit(limitNumber)
      .sort(sortCondition),
    Product.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: products,
    pagination: { page: currentPage, limit: limitNumber, total: totalProduct },
  });
};

exports.createProduct = async (req, res) => {
  try {
    // console.log(req.body);
    const newProduct = await new Product(req.body).save();
    res.json({ data: newProduct });
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

// Get all products (Admin)  =>   /api/admin/products
exports.getAdminProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    data: products,
  });
};

// Get single product details   =>   /api/product/:id
exports.getSingleProduct = async (req, res) => {
  const { productId } = req.params;
  const foundProduct = await Product.findById(req.params.productId);

  if (!foundProduct) {
    res.status(404).json({ err: "Not found product" });
  }

  res.status(200).json({
    success: true,
    data: foundProduct,
  });
};

// Update Product   =>   /api/admin/product/:id
exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const foundProduct = await Product.findOne({ _id: productId });

  if (!foundProduct) {
    res.status(404).json({ err: "Not found product" });
  }
  const dataUpdate = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(productId, dataUpdate, { new: true });

  res.status(200).json({ success: true, data: updatedProduct });
};

// Delete Product   =>   /api/admin/product/:id
exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const foundProduct = await Product.findOne({ _id: productId });

  if (!foundProduct) {
    res.status(404).json({ err: "Not found product" });
  }

  const deletedProduct = await Product.findByIdAndUpdate(
    productId,
    { status: "deleted" },
    { new: true }
  );

  res.status(200).json({ success: true, data: deletedProduct });
};

exports.viewProduct = async (req, res) => {
  const { productId } = req.params;

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { $inc: { numOfViews: 1 } },
    { new: true }
  );

  res.status(200).json({ success: true, data: updatedProduct });
};
