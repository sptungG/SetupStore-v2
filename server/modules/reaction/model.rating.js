const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const RatingSchema = mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    createdBy: { type: ObjectId, ref: "User" },
    ratedValue: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", RatingSchema);
