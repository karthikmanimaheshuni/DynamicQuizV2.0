// backend/models/question.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  correct_answer: String,
});

module.exports = mongoose.model("Question", questionSchema);
