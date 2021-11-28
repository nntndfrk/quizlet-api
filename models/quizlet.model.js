const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizScheme = new Schema({
  term: String,
  definition: String,
});

const quizletScheme = new Schema({
  userid: { type: mongoose.ObjectId, required: true },
  title: { type: String, required: true },
  publicationDate: { type: Date, default: Date.now },
  quiz: { type: [quizScheme], required: true },
});

const QuizletModel = mongoose.model("Quizlet", quizletScheme);

module.exports = {
  QuizletModel,
};
