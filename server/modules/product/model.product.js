const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const slugOptions = require("../../config/slug.config");
const { ObjectId } = mongoose.Schema;
mongoose.plugin(slug, slugOptions);

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      text: true,
    },
    slug_product: {
      type: String,
      slug: ["name"],
      unique: true,
      text: true,
      index: true,
    },
    desc: {
      type: String,
      required: true,
      text: true,
    },
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
    color: {
      label: String,
      hex_code: String,
    },
    brand: {
      type: String,
    },
    status: { type: String, enum: ["active", "inactive", "deleted"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
