import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["breathing", "video", "audio", "article"], required: true },
    description: { type: String },
    thumbnail: { type: String },
    url: { type: String },      // for videos, audio, breathing guides
    content: { type: String },  // for articles
    durationSec: { type: Number }
  },
  { timestamps: true }
);

export default mongoose.model("Resource", resourceSchema);
