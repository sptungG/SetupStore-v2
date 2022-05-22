const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const WishlistSchema = mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    createdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);
