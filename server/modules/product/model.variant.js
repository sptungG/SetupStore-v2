const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const VariantSchema = mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    color_label: String,
    color_hex_code: String,
    image: { type: ObjectId, ref: "Image" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Variant", VariantSchema);
