"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/userController.js");
var _videoControllers = require("../controllers/videoControllers.js");
var _middlewares = require("../middlewares.mjs");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var rootRouter = _express["default"].Router();
rootRouter.get("/", _videoControllers.home);
rootRouter
  .route("/join")
  .all(_middlewares.publicOnlyMiddleware)
  .get(_userController.getJoin)
  .post(_userController.postJoin);
rootRouter
  .route("/login")
  .all(_middlewares.publicOnlyMiddleware)
  .get(_userController.getLogin)
  .post(_userController.postLogin);
rootRouter.get("/search", _videoControllers.search);
var _default = rootRouter;
exports["default"] = _default;
