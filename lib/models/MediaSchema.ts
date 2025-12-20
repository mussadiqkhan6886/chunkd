import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    media: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);


export const Media = mongoose.models.Media || mongoose.model("Media", MediaSchema)