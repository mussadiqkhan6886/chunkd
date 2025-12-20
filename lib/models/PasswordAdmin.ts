import mongoose from "mongoose";

const passwordAdminSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const PasswordAdmin = mongoose.models.PasswordAdmin || mongoose.model("PasswordAdmin", passwordAdminSchema);
