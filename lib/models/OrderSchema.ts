import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const OrderSchema = new Schema({
 orderId: { type: String, default: () => uuidv4(), unique: true },
    items: [
      {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      image: {
        type: String,
        required: true,
      },
    }
    ],
    pricing: {
      subtotal: {type: String, required: true},
      discountAmount: {type: String},
      deliveryCharges: {type: String, required: true},
      total: {type: String, required: true},
      couponCode: {type: String, default: null}
    },
    userDetails: {
      fullName: {type: String, required: true},
      phone: {type: String, required: true},
      email: {type: String}
    },
    notes: {type: String},
    orderType: {type: String},
    date: {type: String, default: null},
    time: {type: String, default: null},
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    shippingAddress: {
      city: { type: String },
      address: {type: String}
    },
    paymentMethod: {
      type: String,
      enum: ["card"],
      default: "card"
    },
    paymentProof: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const order = mongoose.models.Order || mongoose.model("Order", OrderSchema)

export default order