const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CommentSchema = mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    createdBy: { type: ObjectId, ref: "User" },
    text: String,
    status: { type: String, enum: ["active", "deleted"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
