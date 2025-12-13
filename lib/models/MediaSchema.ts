import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
    {
    img: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    }
})

export const Media = mongoose.models.Media || mongoose.model("Media", MediaSchema)