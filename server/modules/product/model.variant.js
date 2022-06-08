const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const VariantSchema = mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    color_label: { type: String, lowercase: true },
    color_hex_code: { type: String, lowercase: true },
    image: { type: ObjectId, ref: "Image" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Variant", VariantSchema);
