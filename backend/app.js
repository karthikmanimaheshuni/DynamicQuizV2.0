// backend/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { mongoURI } = require("./config");
const questionsRoute = require("./routes/questions");
//const QuestionPaperGenerator = require("./")
//const { generateQuestionPaper } = require("./questionPaperGenerator");


const app = express();

app.use(cors(
  {
    origin:"*"
  }
));
app.use(express.json());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const users = [
  { userId: 'karthikmanimaheshuni@gmail.com', password: 'Karthik@2003' } // You can add more users here
];


app.use("/api", questionsRoute);
app.get("/",(req,res)=>{
  res.send("hello");
})

app.post('/api/login', (req, res) => {
  const { userId, password } = req.body;
  const user = users.find(user => user.userId === userId && user.password === password);
  if (user) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});  

app.post("/api/generate-question-paper", async (req, res) => {
  try {
    const { easy_percentage, medium_percentage, hard_percentage } = req.body;
    console.log(req.body);
    const questionPaper = await generateQuestionPaper(easy_percentage, medium_percentage, hard_percentage);
    res.json(questionPaper);
  } catch (error) {
    console.error('Error generating question paper:', error);
    res.status(500).json({ message: 'Failed to generate question paper.' });
  }
});



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
