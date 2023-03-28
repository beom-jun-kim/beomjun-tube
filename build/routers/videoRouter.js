"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _videoControllers = require("../controllers/videoControllers.js");
var _middlewares = require("../middlewares.mjs");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var videoRouter = _express["default"].Router();

// 위치중요, upload를 제일 위에 둔 이유는
// :id가 위에 있을경우 express가 upload를 :id로 인식 해버린다(위에서 밑으로 읽는다)
// (\\d+) : 숫자만 인식, 자바스크립트이기에 / 하나 더 추가
videoRouter.get("/:id([0-9a-f]{24})", _videoControllers.watch);
videoRouter.route("/upload").all(_middlewares.protectorMiddleware).get(_videoControllers.getUpload).post(_middlewares.videoUpload.fields([
// fields : 두개 이상의 파일을 업로드 할때
// 배열로 선언되며 그 배열안에는 두개의 객체가 들어간다
{
  name: "video",
  maxCount: 1
}, {
  name: "thumb",
  maxCount: 1
}]), _videoControllers.postUpload);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(_middlewares.protectorMiddleware).get(_videoControllers.getEdit).post(_videoControllers.postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(_middlewares.protectorMiddleware).get(_videoControllers.deleteVideo);
var _default = videoRouter;
exports["default"] = _default;