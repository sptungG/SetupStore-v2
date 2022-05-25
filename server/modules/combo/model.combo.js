const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ComboSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      text: true,
    },
    desc: String,
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
    wishlist: [{ type: ObjectId, ref: "User" }],
    image: { type: ObjectId, ref: "Image" },
    products: [
      {
        product: { type: ObjectId, ref: "Product" },
        position: { type: String, trim: true, default: "50%,50%" },
      },
    ],
    status: { type: String, enum: ["active", "inactive", "deleted"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Combo", ComboSchema);
