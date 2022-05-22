const Review = require("./model.review");
const Product = require("../product/model.product");
const User = require("../user/model.user");

// getAllReviews (non-pagination)
exports.getAllReviews = async (req, res) => {
  const reviews = await Review.find();

  res.status(200).json({
    success: true,
    data: reviews,
  });
};
// getFilteredReviews (pagination, sort)
exports.getFilteredReviews = async (req, res) => {
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
};
// getFilteredReviews (productIds, pagination)
exports.getFilteredProductReviews = async (req, res) => {
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
};
// createProductReview
exports.createProductReview = async (req, res) => {
  const { email } = req.user;
  const { productId, rating, comment } = req.body;

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) return res.status(404).json({ err: `${email} not found!` });
  if (["deleted", "inactive"].includes(foundUser.status))
    return res.status(401).json({ err: `${email} is inactive` });

  const foundProduct = await Product.findOne({ _id: productId });
  if (!foundProduct) return res.status(404).json({ err: `${productId} not found!` });

  const foundProductReviews = await Review.find({ product: productId, status: "active" });
  const isReviewed = foundProductReviews.find(
    (r) => r.createdBy.toString() === foundUser._id.toString()
  );
  if (isReviewed) return res.status(400).json({ err: `${productId} has been already reviewed!` });

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
};

// removeReview
exports.removeReview = async (req, res) => {
  const { productId, userId } = req.query;

  const foundProductReview = await Review.find({
    product: productId,
    createdBy: userId,
    status: "active",
  });

  if (foundProductReview.length === 0)
    return res.status(404).json({ err: `${productId}-${userId} not found!` });

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
};
