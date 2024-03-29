"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// db를 mongoose와 연결시켜서 video model을 인식
// model을 만드는 이유 : DB의 구조에 대해 알려줘야 함

// 스키마 : 데이터의 형태 정의
var videoSchema = new _mongoose["default"].Schema({
  // 누군가 홈페이지를 해킹하거나 개발자도구로 조작을 할 수도 있으니 database에 옵션 설정
  title: {
    type: String,
    required: true,
    maxLength: 30
  },
  fileUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxLength: 150
  },
  createdAt: {
    type: Date,
    required: true,
    "default": Date.now
  },
  hashtags: [{
    type: String,
    trim: true
  }],
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }],
  meta: {
    views: {
      type: Number,
      "default": 0,
      required: true
    },
    rating: {
      type: Number,
      "default": 0,
      required: true
    }
  },
  // video와 user를 연결 시키는 작업
  // ref : mongoose에게 owner에 id를 저장하겠다고 알려줘야하기 때문
  // 어떤 model의 objectId인지 (영상 소유자의 id를 video에 저장)
  // 스키마와 함께 모델로 선언된 모델명 여기선 User => objectId가 userModel에서 온다고 알려주는 것
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

// middleware
// 그렇지만 findByIdAndUpdate()에서는 save 훅업이 발생하지 않음

// videoSchema.pre("save", async function () {
//   this.hashtags = this.hashtags[0]
//     .split(",")
//     .map((item) => (item.startsWith("#") ? item : `#${item}`));
// });

// static : data 포맷
// static을 사용하면 import 없이도 Model.function()형태로 사용이 가능함
videoSchema["static"]("formatHashtags", function (hashtags) {
  return hashtags.split(",").map(function (item) {
    return item.startsWith("#") ? item : "#".concat(item);
  });
});

// model의 이름과 schema
var movieModel = _mongoose["default"].model("Video", videoSchema);
var _default = movieModel;
exports["default"] = _default;