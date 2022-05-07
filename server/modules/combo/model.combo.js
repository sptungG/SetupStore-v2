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
    images: {
      type: Array,
    },
    view: {
      type: Number,
      default: 0,
    },
    productIds: [{ type: ObjectId, ref: "Product" }],
    status: { type: String, enum: ["active", "inactive", "deleted"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Combo", ComboSchema);
