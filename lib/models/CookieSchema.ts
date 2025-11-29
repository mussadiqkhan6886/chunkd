import mongoose from "mongoose";

const CookieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], default: [] },
    // CATEGORY
    category: { type: String, enum: ["classic", "limited"], default: "classic" },
    // DROP LOGIC
    releaseDate: { type: Date },
    endDate: { type: Date },
    durationDays: { type: Number },
    soldOut: { type: Boolean, default: false },
    // BADGES
    hotSeller: { type: Boolean, default: false },
    // SAFETY INFO
    allergens: { type: [String], default: [] },
    storage: { type: String, default: "" },
    heating: { type: String, default: "" },
    totalLimit: {type: Number, default: null},
    soldCount: {type: Number, default: null},
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Cookie || mongoose.model("Cookie", CookieSchema);
