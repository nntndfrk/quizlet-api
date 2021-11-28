const express = require("express");
const passport = require("passport");

const AppRouter = express.Router();

require("../auth/auth");
const { Auth } = require("./auth.router");
const { QuizletSafeRoute } = require("./quizlet-safe.router");
const { QuizletPublicRoute } = require("./quizlet-public.router");

AppRouter.use("/", Auth);

AppRouter.use("/", QuizletPublicRoute);

AppRouter.use(
  "/",
  passport.authenticate("jwt", { session: false }),
  QuizletSafeRoute
);

module.exports = {
  AppRouter,
};
