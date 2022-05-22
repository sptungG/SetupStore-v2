const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      text: true,
      trim: true,
      index: true,
    },
    desc: String,
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    quantity: { type: Number, required: [true, "Please enter product quantity"] },
    sold: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        thumbUrl: String,
        uid: String,
      },
    ],
    shipping: {
      type: String,
      default: "yes",
    },
    brand: {
      type: String,
    },
    numOfViews: {
      type: Number,
      default: 0,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    variants: [{ type: ObjectId, ref: "Variant" }],
    combos: [{ type: ObjectId, ref: "Combo" }],
    wishlist: [{ type: ObjectId, ref: "User" }],
    status: { type: String, enum: ["active", "inactive", "deleted"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
