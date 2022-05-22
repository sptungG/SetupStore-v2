const Product = require("./model.product");
const Variant = require("./model.variant");

exports.createVariant = async (req, res) => {
  try {
    const { productId } = req.query;
    const { color, image_id } = req.body;
    // console.log(req.body);
    const newVariant = await new Variant({ product: productId, color, image_id }).save();
    await Product.findByIdAndUpdate(
      productId,
      { $push: { variants: newVariant._id } },
      { new: true }
    );
    res.status(200).json({ success: true, data: newVariant });
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      success: false,
      err: err.message,
    });
  }
};

exports.updateVariant = async (req, res) => {
  try {
    const { variantId } = req.query;
    const { color, image_id } = req.body;
    // console.log(req.body);
    const updatedVariant = await Variant.findOneAndUpdate(
      { _id: variantId },
      { color, image_id },
      { new: true }
    );
    if (!updatedVariant) throw { status: 404, message: `${variantId} not found!` };

    res.status(200).json({ success: true, data: updatedVariant });
  } catch (err) {
    // console.log(err);
    res.status(err?.status || 400).json({
      success: false,
      err: err.message,
    });
  }
};

exports.removeVariant = async (req, res) => {
  try {
    const { variantId, productId } = req.query;
    const removedVariant = await Variant.findOneAndRemove({ _id: variantId });
    if (!removedVariant) throw { status: 404, message: `${variantId} not found!` };
    await Product.findByIdAndUpdate(productId, { $pull: { variants: variantId } }, { new: true });
    res.status(200).json({ success: true, data: removedVariant });
  } catch (err) {
    // console.log(err);
    res.status(err?.status || 400).json({
      success: false,
      err: err.message,
    });
  }
};
