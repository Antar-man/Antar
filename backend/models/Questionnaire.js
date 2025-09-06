const mongoose = require("mongoose");

const QuestionnaireSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mood: { type: String, required: true },
    stress: { type: String, required: true },
  sleepHours: { type: Number, required: true },
  gad7Score: { type: Number },
  },
  { timestamps: true } // keeps createdAt & updatedAt automatically
);

module.exports = mongoose.model("Questionnaire", QuestionnaireSchema);
