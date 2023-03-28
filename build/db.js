"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
// database에 연결
_mongoose["default"].set("strictQuery", true);
_mongoose["default"].connect(process.env.DB_URL);

// mongoose가 connection에 대한 액세스를 줌
var db = _mongoose["default"].connection;

// on : 여러번 계속 발생시킬 수 있다 . 클릭 이벤트
// once : 한번만 발생
var handleOpen = function handleOpen() {
  return console.log("connected to DB ✔");
};
var handleError = function handleError() {
  return console.log("DB Error", error);
};
db.on("error", handleError);
db.once("open", handleOpen);

// CRUD
// c : create
// r : read
// u : update
// d : delete
