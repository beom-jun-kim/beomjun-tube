"use strict";

require("dotenv/config");
require("./db.js");
require("./models/video.js");
require("./models/user.js");
require("./models/comment.js");
var _server = _interopRequireDefault(require("./server.js"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
// 내컴퓨터에서는 4000 , heroku에서 실행될때는 port변수
var PORT = process.env.PORT || 4000;
var handleListening = function handleListening() {
  console.log("hi http://localhost:".concat(PORT));
};
_server["default"].listen(PORT, handleListening);
