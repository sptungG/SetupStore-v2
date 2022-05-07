const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      text: true,
    },
    image: {
      type: String,
      default: "https://source.unsplash.com/random?setup",
    },
    status: { type: String, enum: ["active", "inactive", "deleted"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
