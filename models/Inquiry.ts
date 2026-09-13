import mongoose, { Schema } from "mongoose";

const InquirySchema = new Schema(
  {
    customerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "contacted", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Inquiry ||
  mongoose.model("Inquiry", InquirySchema);