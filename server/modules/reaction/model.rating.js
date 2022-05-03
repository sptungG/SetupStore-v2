const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const RatingSchema = mongoose.Schema(
  {
    productId: { type: ObjectId, ref: "Product" },
    ratedValue: Number,
    createdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", RatingSchema);
