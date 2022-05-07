const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        variants: [
          {
            variant: {
              type: ObjectId,
              ref: "Variant",
            },
            count: Number,
            price: Number,
          },
        ],
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    createdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
