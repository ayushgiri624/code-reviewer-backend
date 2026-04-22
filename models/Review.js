import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  language: { type: String, required: true },
  reviewType: { type: String, required: true },
  code: { type: String, required: true },
  result: { type: String, required: true },
  scores: {
    quality: Number,
    performance: Number,
    security: Number,
    readability: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);