const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const VariantSchema = mongoose.Schema(
  {
    productId: { type: ObjectId, ref: "Product" },
    text: String,
    createdBy: { type: ObjectId, ref: "User" },
    status: { type: String, enum: ["active", "inactive", "deleted"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Variant", VariantSchema);
