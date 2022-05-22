const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ReviewSchema = mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    createdBy: { type: ObjectId, ref: "User" },
    comment: String,
    rating: { type: Number, required: true },
    status: { type: String, enum: ["active", "deleted"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
