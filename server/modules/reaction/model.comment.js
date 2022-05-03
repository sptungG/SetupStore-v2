const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CommentSchema = mongoose.Schema(
  {
    productId: { type: ObjectId, ref: "Product" },
    text: String,
    createdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
