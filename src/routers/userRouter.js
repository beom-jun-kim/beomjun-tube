import express from "express";
import {
  getEdit,
  postEdit,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
  postChangePassword,
  getChangePassword,
} from "../controllers/userController.js";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  avatarUpload,
} from "../middlewares.js";

const userRouter = express.Router();

userRouter.get("/:id([0-9a-f]{24})", see);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter
  .route("/edit-profile")
  .all(protectorMiddleware)
  .get(getEdit)

  // 이름이 avatar인 파일 수락 , req에 보내진다
  .post(
    avatarUpload.single("avatar"),
    postEdit
  ); /* 옵션 : fields, none, single, arry (파일을 upload 시킨다)*/
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

export default userRouter;
