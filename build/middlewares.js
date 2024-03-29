"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoUpload = exports.publicOnlyMiddleware = exports.protectorMiddleware = exports.localsMiddlewares = exports.avatarUpload = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _multerS = _interopRequireDefault(require("multer-s3"));
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _heroku = _interopRequireDefault(require("./heroku.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var s3 = new _awsSdk["default"].S3({
  // aws id와 aws secret 둘다 옵션으로 전달
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
  }
});
var s3ImageUploader = (0, _multerS["default"])({
  s3: s3,
  bucket: "beomjun-tube/images",
  acl: 'public-read'
});
var s3VideoUploader = (0, _multerS["default"])({
  s3: s3,
  bucket: "beomjun-tube/videos",
  acl: 'public-read',
  // ios에서 영상 재생
  contentType: _multerS["default"].AUTO_CONTENT_TYPE
});
var localsMiddlewares = function localsMiddlewares(req, res, next) {
  // 왜 res.locals에 담아서 하는가?
  // res에 locals이라는 obj가 있는데 템플릿에서 locals에 접근 가능 (템플릿과 data 공유)

  // 브라우저마다 다른 결과를 나타낸다 (session ID)
  // 템플릿에 변수를 전역적으로 보낼 수 있다(render로 보내지 않아도 됨 ) : res.locals.변수명 = "변수내용";
  // locals obj는 이미 모든 템플릿에 import 된 obj이다
  // locals에 로그인한 사용자를 추가할 때 사용 할 것이다
  // localsMiddlewares는 req.session에 접근 가능
  // localsMiddlewares session은 미들웨어 다음에 오기 때문에 가능
  // locals는 res에 있고 session은 req에 있다 (session엔 user가 있다)
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "webtube";

  // session.user 값 템플릿과 공유
  res.locals.loggedInUser = req.session.user || {};
  res.locals.isHeroku = _heroku["default"];
  next();
};
exports.localsMiddlewares = localsMiddlewares;
var protectorMiddleware = function protectorMiddleware(req, res, next) {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "로그인이 되어있지 않습니다");
    return res.redirect("/login");
  }
};
exports.protectorMiddleware = protectorMiddleware;
var publicOnlyMiddleware = function publicOnlyMiddleware(req, res, next) {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "로그인이 되어있습니다");
    return res.redirect("/");
  }
};

// dest 또는 storage: 파일을 저장할 위치
// gitignore에 경로 추가
// db에 파일을 저장하면 안됨. 파일의 위치를 저장 : db는 파일 저장을 위한게 아니다
// limits : fileSize (multer 옵션) , 파일 최대 크기 지정
exports.publicOnlyMiddleware = publicOnlyMiddleware;
var avatarUpload = (0, _multer["default"])({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 5000000
  },
  storage: _heroku["default"] ? s3ImageUploader : undefined
});
exports.avatarUpload = avatarUpload;
var videoUpload = (0, _multer["default"])({
  dest: "uploads/videos/",
  limits: {
    fileSize: 7000000
  },
  storage: _heroku["default"] ? s3VideoUploader : undefined
});
exports.videoUpload = videoUpload;