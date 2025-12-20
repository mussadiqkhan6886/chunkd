import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const CookieSchema = new Schema({
  cookieId: { type: String, required: true },
  cookieName: { type: String, required: true },
  cookieQty: { type: Number, required: true },
  cookiePrice: { type: Number, required: true },
});

const ItemSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ["box", "simple"], required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String },
  size: { type: String }, // only for box
  boxData: { type: [CookieSchema], default: [] }, // only for box
});

const OrderSchema = new Schema(
  {
    orderId: { type: String, default: () => uuidv4(), unique: true },
    items: { type: [ItemSchema], required: true },
    pricing: {
      subtotal: { type: Number, required: true },
      discountAmount: { type: Number, default: 0 },
      deliveryCharges: { type: Number, required: true },
      total: { type: Number, required: true },
      couponCode: { type: String, default: null },
    },
    userDetails: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, default: "N/A" },
    },
    shippingAddress: {
      city: { type: String, required: true },
      address: { type: String, required: true },
    },
    notes: { type: String, default: "No notes" },
    orderType: { type: String, default: "" },
    date: { type: String, default: null },
    time: { type: String, default: null },
    paymentMethod: {
      type: String,
      enum: ["card"], // can add more if needed
      default: "card",
    },
    paymentProof: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
