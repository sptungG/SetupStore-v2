const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const VariantSchema = mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    color: {
      label: String,
      hex_code: String,
    },
    // images: {
    //   type: Array,
    // },
    status: { type: String, enum: ["active", "inactive", "deleted"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Variant", VariantSchema);
