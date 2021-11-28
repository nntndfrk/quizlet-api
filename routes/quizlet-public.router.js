const express = require("express");
const QuizletPublicRoute = express.Router();

const { QuizletModel } = require("../models/quizlet.model");

QuizletPublicRoute.get(
  "/recently-quizlets",
  async (request, response, next) => {
    try {
      response.send(
        await QuizletModel.find({}).sort({ publicationDate: -1 }).limit(10)
      );
    } catch (error) {
      next(error);
    }
  }
);

module.exports = { QuizletPublicRoute };
