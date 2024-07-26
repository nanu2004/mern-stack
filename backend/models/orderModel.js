import mongoose from "mongoose";

// Ensure the reference name is consistent with the User model
const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,  // Use Schema.Types.ObjectId
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,  // Use Schema.Types.ObjectId
      ref: "User",  // Correct the reference name to match the User model name
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
