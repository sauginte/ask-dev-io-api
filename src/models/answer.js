import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
  id: { type: String, required: true },
  answerText: { type: String, required: true },
  questionId: { type: String, required: true },
  likeNumber: { type: Number, required: true },
  createdAt: { type: Date, required: true },
});

export default mongoose.model("Answer", answerSchema);
