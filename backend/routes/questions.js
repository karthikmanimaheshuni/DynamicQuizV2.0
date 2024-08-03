const express = require("express");
const router = express.Router();
const Question = require("../models/question");
//const evaluateDifficulty = require("../services/questionDifficultyEvaluator");

router.post("/generate-question-paper", async (req, res) => {
  try {
    // Fetch all questions from the database
    const questions = await Question.find();

    if (questions.length === 0) {
      return res.status(404).json({ error: "No questions found in the database" });
    }

    const easyQuestions = [];
    const mediumQuestions = [];
    const hardQuestions = [];

    // Evaluate the difficulty of each question
  
    questions.forEach((question) => {
      
      const key=Object.values(question);
      //console.log(key[2].difficulty);
      const difficult =key[2].difficulty;
      if (difficult === "easy") {
        easyQuestions.push(question);
      } else if (difficult === "medium") {
        mediumQuestions.push(question);
      } else {
        hardQuestions.push(question);
      }
    });

    // Function to get unique random numbers
    function getRandomNumbers(count, min, max) {
      const numbers = new Set();
      while (numbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.add(randomNumber);
      }
      return Array.from(numbers);
    }

    // Generate the question paper
    const questionPaper = [];

    const easyCount = Math.floor(20 * 0.3);
    const mediumCount = Math.floor(20 * 0.4);
    const hardCount = 20 - easyCount - mediumCount;

    if (easyQuestions.length >= easyCount) {
      const selectedNumbers = getRandomNumbers(easyCount, 0, easyQuestions.length - 1);
      selectedNumbers.forEach((i) => {
        questionPaper.push(easyQuestions[i]);
      });
    }

    if (mediumQuestions.length >= mediumCount) {
      const selectedNumbers = getRandomNumbers(mediumCount, 0, mediumQuestions.length - 1);
      selectedNumbers.forEach((i) => {
        questionPaper.push(mediumQuestions[i]);
      });
    }
    
 console.log("no of hard qs  "+hardQuestions.length);
    if (hardQuestions.length >= hardCount) {
      const selectedNumbers = getRandomNumbers(hardCount, 0, hardQuestions.length - 1);
      selectedNumbers.forEach((i) => {
        questionPaper.push(hardQuestions[i]);
      });
    }

    // if (questionPaper.length !== 20) {
    //   return res.status(500).json({ error: "Failed to generate question paper with 20 questions" });
    // }

    questionPaper.sort(() => Math.random() - 0.5);
    res.json(questionPaper);
  } catch (error) {
    console.error("Error generating question paper:", error);
    res.status(500).json({ error: "Failed to generate question paper" });
  }
});

module.exports = router;
