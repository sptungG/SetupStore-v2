const { convertToNumber } = require("../../common/utils");
const Product = require("./model.product");
const Variant = require("./model.variant");
const User = require("../user/model.user");
const Wishlist = require("../reaction/model.wishlist");
const Review = require("../reaction/model.review");

// getFilteredProducts (pagination, sort, search)
exports.getFilteredProducts = async (req, res) => {
  try {
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
        .populate("variants", "_id color image_id")
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
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    // console.log(req.body);
    const newProduct = await new Product(req.body).save();
    res.status(200).json({ success: true, data: newProduct });
  } catch (err) {
    // console.log(err);
    res.status(400).json({ success: false, err: err.message });
  }
};

// Get all products (Admin)  =>   /api/admin/products
exports.getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};

// Get single product details   =>   /api/product/:id
exports.getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const foundProduct = await Product.findById(productId);

    if (!foundProduct) throw { status: 404, message: `${productId} not found!` };

    res.status(200).json({
      success: true,
      data: foundProduct,
    });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

// Update Product   =>   /api/admin/product/:id
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.query;
    const foundProduct = await Product.findOne({ _id: productId });

    if (!foundProduct) throw { status: 404, message: `${productId} not found!` };
    const dataUpdate = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(productId, dataUpdate, { new: true });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

// Delete Product   =>   /api/admin/product/:id
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.query;
    const foundProduct = await Product.findOne({ _id: productId });

    if (!foundProduct) throw { status: 404, message: `${productId} not found!` };

    const deletedProduct = await Product.findByIdAndRemove(productId);
    await User.updateMany({}, { $pull: { wishlist: productId } }, { new: true });
    await Variant.remove({ product: productId });
    await Wishlist.remove({ product: productId });
    await Review.remove({ product: productId });

    res.status(200).json({ success: true, data: deletedProduct });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

exports.viewProduct = async (req, res) => {
  try {
    const { productId } = req.query;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $inc: { numOfViews: 1 } },
      { new: true }
    );
    if (!updatedProduct) throw { status: 404, message: `${productId} not found!` };
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};
