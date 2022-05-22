const Review = require("./model.review");
const Product = require("../product/model.product");
const User = require("../user/model.user");

// getAllReviews (non-pagination)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      err: "Get reviews failed",
    });
  }
};
// getFilteredReviews (pagination, sort)
exports.getFilteredReviews = async (req, res) => {
  try {
    const { page, limit, sort } = req.query;
    const currentPage = page || 1;

    const limitNumber = limit && Number(limit) ? Number(limit) : 4;

    let filter = { status: "active" };
    let sortCondition = {};

    if (sort) {
      const [sortField, sortDirection] = sort.split("_");
      if (sortField && sortDirection) {
        sortCondition[sortField] = sortDirection === "desc" ? -1 : 1;
      }
    } else {
      sortCondition["createdAt"] = -1;
    }

    const [reviews, totalReview] = await Promise.all([
      Review.find(filter)
        .populate("product", "_id name")
        .populate("createdBy", "_id name picture")
        .skip((currentPage - 1) * limitNumber)
        .limit(limitNumber)
        .sort(sortCondition),
      Review.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: reviews,
      pagination: { page: currentPage, limit: limitNumber, total: totalReview },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      err: "Get reviews failed",
    });
  }
};
// getFilteredReviews (productIds, pagination)
exports.getFilteredProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, page, limit, sort } = req.query;
    const currentPage = page || 1;
    const limitNumber = limit && Number(limit) ? Number(limit) : 4;

    let filter = { product: productId, status: "active" };
    let sortCondition = {};

    if (sort) {
      const [sortField, sortDirection] = sort.split("_");
      if (sortField && sortDirection) {
        sortCondition[sortField] = sortDirection === "desc" ? -1 : 1;
      }
    }

    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    const [reviews, totalReview] = await Promise.all([
      Review.find(filter)
        .populate("product", "_id name")
        .populate("createdBy", "_id name picture")
        .skip((currentPage - 1) * limitNumber)
        .limit(limitNumber)
        .sort(sortCondition),
      Review.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: reviews,
      pagination: { page: currentPage, limit: limitNumber, total: totalReview },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      err: "Get reviews failed",
    });
  }
};
// createProductReview
exports.createProductReview = async (req, res) => {
  try {
    const { email } = req.user;
    const { productId } = req.query;
    const { rating, comment } = req.body;

    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) throw { status: 404, message: `${email} not found` };
    if (["deleted", "inactive"].includes(foundUser.status))
      throw { status: 400, message: `${email} is inactive` };

    const foundProduct = await Product.findOne({ _id: productId });
    if (!foundProduct) throw { status: 404, message: `${productId} not found!` };

    const foundProductReviews = await Review.find({ product: productId, status: "active" });
    const isReviewed = foundProductReviews.find(
      (r) => r.createdBy.toString() === foundUser._id.toString()
    );
    if (isReviewed) throw { status: 400, message: `${productId} has been already reviewed!` };

    const reviewData = {
      product: productId,
      createdBy: foundUser._id,
      rating: Number(rating),
      comment,
    };

    const newReview = await new Review(reviewData).save();
    const productReview = await Review.find({ product: productId, status: "active" });

    const avgRating =
      productReview.length > 0
        ? productReview.reduce((currentValue, nextValue) => nextValue.rating + currentValue, 0) /
          productReview.length
        : 0;

    await Product.findByIdAndUpdate(
      productId,
      {
        avgRating,
        numOfReviews: productReview.length,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: newReview,
    });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

// removeReview
exports.removeReview = async (req, res) => {
  try {
    const { productId, userId } = req.query;

    const foundProductReview = await Review.find({
      product: productId,
      createdBy: userId,
      status: "active",
    });

    if (foundProductReview.length === 0)
      throw { status: 404, message: `${productId}-${userId} not found!` };

    const [review] = foundProductReview;
    const deletedReview = await Review.findOneAndUpdate(
      { _id: review._id },
      { status: "deleted" },
      { new: true }
    );

    const productReviews = await Review.find({ product: productId, status: "active" });

    const numOfReviews = productReviews.length;

    const avgRating =
      numOfReviews > 0
        ? productReviews.reduce((currentValue, nextValue) => nextValue.rating + currentValue, 0) /
          productReviews.length
        : 0;

    await Product.findByIdAndUpdate(
      productId,
      {
        avgRating,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      data: deletedReview,
    });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};