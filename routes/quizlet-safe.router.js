const express = require("express");
const QuizletSafeRoute = express.Router();

const { QuizletModel } = require("../models/quizlet.model");

QuizletSafeRoute.get("/my-quizlets", async (request, response, next) => {
  try {
    const userid = request.user._id;
    response.send(await QuizletModel.find({ userid }));
  } catch (error) {
    next(error);
  }
});

QuizletSafeRoute.post("/quizlet-create", async (request, response, next) => {
  const newQuizlet = { ...request.body, userid: request.user._id };
  try {
    await QuizletModel.validate(newQuizlet);

    const quizletDoc = await QuizletModel.create(newQuizlet);

    response.send(quizletDoc);
  } catch (error) {
    next(error);
  }
});

QuizletSafeRoute.delete("/quizlet-delete", async (request, response, next) => {
  try {
    const quizletID = request.body.id;
    const userid = request.user._id;
    const quizletDocForDelete = await QuizletModel.findOne({
      _id: quizletID,
    });

    if (quizletDocForDelete._doc.userid.toString() === userid) {
      await QuizletModel.deleteOne({ _id: quizletID });
      response.send({ status: "OK" });
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = {
  QuizletSafeRoute,
};
