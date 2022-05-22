const Category = require("./model.category");
const Product = require("../product/model.product");
const { vietnameseSlug } = require("../../common/utils");
const { NOT_FOUND_IMG } = require("../../common/constants");

exports.getAllCategory = async (req, res) => {
  const { status } = req.query;
  const categoryList = await Category.find({ status }).sort({ createdAt: -1 }).exec();
  res.status(200).json({success: true, data: categoryList });
};

// exports.getFilteredCategory = async (req, res) => {};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findOne({ _id: id, status: "active" }).exec();
  const products = await Product.find({ category }).populate("category").exec();
  res.status(200).json({
    success: true,
    category,
    data: products,
  });
};

exports.createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const category = await new Category({
      name,
      image,
    }).save();
    res.status(200).json({success: true, data: category });
  } catch (err) {
    // console.log(err);
    res.status(400).send("Create category failed");
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, image, status } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { _id: id },
      { name, image, status },
      { new: true }
    );
    res.status(200).json({success: true, data: updated });
  } catch (err) {
    res.status(400).send("Category update failed");
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findOneAndUpdate(
      { _id: id },
      { status: "deleted" },
      { new: true }
    );

    const products = await Product.updateMany({
      option: { category: id },
      data: { status: "deleted" },
    });
    res.status(200).json({success: true, data: category });
  } catch (err) {
    res.status(400).send("Category delete failed");
  }
};
