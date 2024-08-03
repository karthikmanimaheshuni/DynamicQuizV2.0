// backend/importData.js
const mongoose = require("mongoose");
const { mongoURI } = require("./config");
const Question = require("./models/question");
const questions = require("./data/questions.json");

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("MongoDB connected");
    await Question.deleteMany();
    await Question.insertMany(questions);
    console.log("Data imported");
    process.exit();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  });
