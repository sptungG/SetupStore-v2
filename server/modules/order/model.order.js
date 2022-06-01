const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      phoneNo: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
        default: "VietNam",
      },
    },
    orderItems: [
      {
        saved_name: {
          type: String,
          required: true,
        },
        saved_quantity: {
          type: Number,
          required: true,
        },
        saved_image: {
          type: String,
          required: true,
        },
        saved_price: {
          type: Number,
          required: true,
        },
        saved_variant: {
          type: String,
          required: true,
          default: "white,#fff",
        },
        product: {
          type: ObjectId,
          required: true,
          ref: "Product",
        },
        variant: {
          type: ObjectId,
          required: true,
          ref: "Variant",
        },
      },
    ],
    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
    },
    paidAt: {
      type: Date,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    deliveredAt: {
      type: Date,
    },
    orderStatus: {
      type: String,
      required: true,
      default: "Processing",
    },
    createdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
