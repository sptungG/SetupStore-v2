const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      text: true,
      index: true,
    },
    desc: String,
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      default: "yes",
    },
    brand: {
      type: String,
    },
    view: {
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
