const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UserSchema = mongoose.Schema(
  {
    name: String,
    picture: String,
    phone: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    area: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    emailVerified: { type: Boolean, default: false },
    // cart: [{ type: ObjectId, ref: "Cart" }],
    wishlist_products: [{ type: ObjectId, ref: "Product" }],
    wishlist_combos: [{ type: ObjectId, ref: "Combo" }],
    status: { type: String, enum: ["active", "inactive", "deleted"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
