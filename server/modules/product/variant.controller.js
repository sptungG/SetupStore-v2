const Product = require("./model.product");
const Variant = require("./model.variant");

exports.createVariant = async (req, res) => {
  try {
    const { productId } = req.query;
    let { color_label, color_hex_code, image } = req.body;
    const foundProduct = await Product.findOne({ _id: productId });
    if (!foundProduct) throw { status: 404, message: `Product:${productId} not found!` };

    if (!image && foundProduct.images.length > 0) image = foundProduct.images[0];
    // console.log(req.body);
    const newVariant = await new Variant({
      product: productId,
      color_label,
      color_hex_code: color_hex_code.replace(/[^\w\s]/g, ""),
      image,
    }).save();
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
    const { color_label, color_hex_code, image } = req.body;
    // console.log(req.body);
    let updatedVariant = await Variant.findOne({ _id: variantId });
    if (!updatedVariant) throw { status: 404, message: `${variantId} not found!` };

    updatedVariant = await Variant.findOneAndUpdate(
      { _id: variantId },
      { color_label, color_hex_code: color_hex_code.replace(/[^\w\s]/g, ""), image },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedVariant });
  } catch (err) {
    // console.log(err);
    res.status(err?.status || 400).json({
      success: false,
      err: err.message,
    });
  }
};

exports.removeVariants = async (req, res) => {
  try {
    const { variantIds } = req.body;

    const removedVariantPromises = variantIds.map((id) => Variant.findOneAndRemove({ _id: id }));

    let removedVariants = await Promise.all(removedVariantPromises);
    removedVariants = removedVariants.filter((r) => r != null);
    let productUpdatePromises = removedVariants.map((r) =>
      Product.findByIdAndUpdate(r.product, { $pull: { variants: r._id } }, { new: true })
    );
    await Promise.all(productUpdatePromises);

    res.status(200).json({ success: true, data: removedVariants });
  } catch (err) {
    // console.log(err);
    res.status(err?.status || 400).json({
      success: false,
      err: err.message,
    });
  }
};
