import express from "express";
import {
  getEdit,
  postEdit,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController.js";
import {protectorMiddleware,publicOnlyMiddleware} from "../middlewares.js";

const userRouter = express.Router();

userRouter.get(":id", see);
userRouter.get("/logout",protectorMiddleware, logout);
userRouter.route("/edit-profile").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/github/start",publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish",publicOnlyMiddleware, finishGithubLogin);

export default userRouter;
