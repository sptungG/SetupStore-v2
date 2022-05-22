const cloudinary = require("cloudinary").v2;
const { convertToNumber } = require("../../common/utils");
const Product = require("./model.product");
const Variant = require("./model.variant");
const User = require("../user/model.user");
const Wishlist = require("../reaction/model.wishlist");
const Review = require("../reaction/model.review");
const Category = require("../category/model.category");

// getFilteredProducts (pagination, sort, search)
exports.getFilteredProducts = async (req, res) => {
  try {
    const { status, rating, price, color, keyword, page, limit, sort } = req.query;
    const currentPage = page || 1;

    const limitNumber = convertToNumber(limit) || 4;

    let filter = {};
    let sortCondition = {};

    if (status) {
      filter.status = status;
    }

    if (rating) {
      filter.avgRating = {
        $gte: convertToNumber(rating),
        $lte: convertToNumber(rating) > 4 ? 5 : convertToNumber(rating) + 1,
      };
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

    if (color) {
    }

    const [products, totalProduct] = await Promise.all([
      Product.find(filter)
        .populate("category", "_id name")
        .populate("wishlist", "_id name picture")
        .populate("variants", "_id color_label color_hex_code image_id")
        .skip((currentPage - 1) * limitNumber)
        .limit(limitNumber)
        .sort(sort ? sortCondition : { createdAt: -1 }),
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
    const { category } = req.body;
    const foundCategory = await Category.findById(category);
    if (!foundCategory) throw { status: 404, message: `${category} not found!` };
    const newProduct = await new Product(req.body).save();
    res.status(200).json({ success: true, data: newProduct });
  } catch (err) {
    // console.log(err);
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

// Get all products (Admin)  =>   /api/admin/products
exports.getAdminProducts = async (req, res) => {
  try {
    const { keyword, sort } = req.query;
    let filter = {};
    let sortCondition = {};

    if (keyword) {
      const regex = new RegExp(`${keyword}`, "i");
      const regexCond = { $regex: regex };
      console.log(regexCond);
      filter["$or"] = [{ name: regexCond }, { desc: regexCond }];
    }

    if (sort) {
      const [sortField, sortDirection] = sort.split("_");
      if (sortField && sortDirection) {
        sortCondition[sortField] = sortDirection === "desc" ? -1 : 1;
      }
    }

    const products = await Product.find(filter)
      .populate("category", "_id name")
      .populate("wishlist", "_id name picture")
      .populate("variants", "_id color_label color_hex_code image_id")
      .sort(sort ? sortCondition : { createdAt: -1 });

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
    const foundProduct = await Product.findById(productId)
      .populate("category", "_id name")
      .populate("wishlist", "_id name picture")
      .populate("variants", "_id color_label color_hex_code image_id");

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

    // Deleting images associated with the product
    // for (let i = 0; i < foundProduct.images.length; i++) {
    //   const result = await cloudinary.uploader.destroy(foundProduct.images[i].public_id);
    // }

    const deletedProduct = await Product.findByIdAndRemove(productId);

    await Promise.all(
      User.updateMany({}, { $pull: { wishlist: productId } }, { new: true }),
      Variant.deleteMany({ product: productId }),
      Wishlist.deleteMany({ product: productId }),
      Review.deleteMany({ product: productId })
    );

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
