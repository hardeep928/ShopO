import mongoose from "mongoose";

const paymentDetailsSchema = new mongoose.Schema(
  {
    cardType: String, // "credit" | "debit"
    last4Digits: String, // "1234"

    bankName: String, // EMI
    emiDuration: Number, // 3, 6, 9, 12
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productId: String,
        title: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],

    paymentMethod: {
      type: String,
      enum: ["cod", "card", "emi"],
      default: "cod",
    },

    paymentDetails: paymentDetailsSchema,

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Placed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
