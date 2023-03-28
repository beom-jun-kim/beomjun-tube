"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/userController.js");
var _middlewares = require("../middlewares.mjs");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var userRouter = _express["default"].Router();
userRouter.get("/:id([0-9a-f]{24})", _userController.see);
userRouter.get(
  "/logout",
  _middlewares.protectorMiddleware,
  _userController.logout
);
userRouter
  .route("/edit-profile")
  .all(_middlewares.protectorMiddleware)
  .get(_userController.getEdit)

  // 이름이 avatar인 파일 수락 , req에 보내진다
  .post(
    _middlewares.avatarUpload.single("avatar"),
    _userController.postEdit
  ); /* 옵션 : fields, none, single, arry (파일을 upload 시킨다)*/
userRouter.get(
  "/github/start",
  _middlewares.publicOnlyMiddleware,
  _userController.startGithubLogin
);
userRouter.get(
  "/github/finish",
  _middlewares.publicOnlyMiddleware,
  _userController.finishGithubLogin
);
userRouter
  .route("/change-password")
  .all(_middlewares.protectorMiddleware)
  .get(_userController.getChangePassword)
  .post(_userController.postChangePassword);
var _default = userRouter;
exports["default"] = _default;
