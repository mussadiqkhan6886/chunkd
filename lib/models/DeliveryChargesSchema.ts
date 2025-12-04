import mongoose from "mongoose";

const DeliveryChargeSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      unique: true,
    },
    charge: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.DeliveryCharge ||
  mongoose.model("DeliveryCharge", DeliveryChargeSchema);
