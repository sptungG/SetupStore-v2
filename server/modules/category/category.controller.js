const Category = require("./model.category");
const Product = require("../product/model.product");
const { vietnameseSlug } = require("../../common/utils");
const { NOT_FOUND_IMG } = require("../../common/constants");

exports.getAllCategory = async (req, res) => {
  try {
    const { status } = req.query;
    const categoryList = await Category.find({ status }).sort({ createdAt: -1 }).exec();
    res.status(200).json({ success: true, data: categoryList });
  } catch (err) {
    res.status(400).send({ success: false, err: "Get categories failed" });
  }
};

// exports.getFilteredCategory = async (req, res) => {};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id, status: "active" }).exec();
    if (!category) throw { status: 404, message: `${id} not found!` };
    const products = await Product.find({ category: id }).populate("category").exec();
    res.status(200).json({
      success: true,
      category,
      data: products,
    });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const category = await new Category({
      name,
      image,
    }).save();
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    // console.log(err);
    res.status(400).send({ success: false, err: "Create category failed" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, status } = req.body;
    const updated = await Category.findOneAndUpdate(
      { _id: id },
      { name, image, status },
      { new: true }
    );
    if (!updated) throw { status: 404, message: `${id} not found!` };
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndRemove({ _id: id });
    if (!category) throw { status: 404, message: `${id} not found!` };
    const products = await Product.remove({ category: id });
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};
