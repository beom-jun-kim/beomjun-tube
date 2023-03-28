"use strict";

require("dotenv/config");
require("./db.mjs");
require("./models/video.mjs");
require("./models/user.mjs");
require("./models/comment.mjs");
var _server = _interopRequireDefault(require("./server.mjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// 내컴퓨터에서는 4000 , heroku에서 실행될때는 port변수
var PORT = process.env.PORT || 4000;
var handleListening = function handleListening() {
  console.log("hi http://localhost:".concat(PORT));
};
_server["default"].listen(PORT, handleListening);