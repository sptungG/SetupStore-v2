const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const slugOptions = require("../../config/slug.config");
mongoose.plugin(slug, slugOptions);

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      text: true,
    },
    slug_category: {
      type: String,
      slug: ["name"],
      unique: true,
      text: true,
      index: true,
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
