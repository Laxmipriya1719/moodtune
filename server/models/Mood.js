import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mood: { type: String, required: true },
  confidence: { type: Number, default: 1 },
  type: { type: String }, // optional: happy, sad, etc.
  createdAt: { type: Date, default: Date.now },
});

const Mood = mongoose.model("Mood", moodSchema);
export default Mood;
