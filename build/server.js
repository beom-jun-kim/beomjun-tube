"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("./db.mjs");
require("./models/video.mjs");
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _expressFlash = _interopRequireDefault(require("express-flash"));
var _rootRouter = _interopRequireDefault(require("./routers/rootRouter.mjs"));
var _userRouter = _interopRequireDefault(require("./routers/userRouter.mjs"));
var _videoRouter = _interopRequireDefault(require("./routers/videoRouter.mjs"));
var _apiRouter = _interopRequireDefault(require("./routers/apiRouter.mjs"));
var _middlewares = require("./middlewares.mjs");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var logger = (0, _morgan["default"])("dev");
app.set("view engine", "pug"); /* express는 views 디렉토리에서 pug를 찾는다 */
app.set("views", process.cwd() + "/src/views"); /* 디폴트 값에서 변경 /src 추가 */

app.use(logger);

//- express.js > express.urlencoded() >
//- extended : body에 있는 정보들을 보기 좋게 형식을 갖춰준다(form의 데이터를 줄것이다)
// middleware는 route를 사용하기 전에 사용해야한다
// html form을 이해하고 form의 value들을 우리가 이해할 수 있는 js obj형식으로 변형
// express에 내장된 미들웨어 기능.
// 데이터 파싱기능
app.use(_express["default"].urlencoded({
  extended: true
}));

// 댓글기능 구현시 필요한 미들웨어
// string을 받아서 json으로 바꾸는 미들웨어
app.use(_express["default"].json());

// session 저장소
// route 사용하기 전에 사용(middleware이니까)
// 이 미들웨어가 사이트로 들어오는 모두를 기억
// 브라우저가 서버에 요청 > 서버는 session 미들웨어가 브라우저한테 텍스트를 보낸다
// 방문시 express가 세션 id 생성 > 브라우저가 받음 > 쿠키에 세션 id 저장 > express에서도 해당 세션 DB에 저장(서버가 재부팅되면 초기화되기에)
app.use((0, _expressSession["default"])({
  // 옵션설정
  secret: process.env.COOKIE_SECRET,
  // 모든 request마다 세션의 변경사항 있든 없든 세션을 다시 저장
  // flase를 주는 이유 : 변경사항 없을시 다시 저장하면 비효율. 충돌방지 등
  resave: false,
  // 세션을 수정할 때만 세션을 DB에 저장. 쿠키에 넘겨주는 설정 (로그인한 유저에게만 쿠키를 주도록 설정)
  // flase를 주는 이유 : uninitialized 상태인 세션을 강제로 저장하면 저장공간 부족 현상, 쿠키 사용정책 준수
  // uninitialized 상태 : 아무 작업이 가해지지 않는 초기 상태의 세션
  saveUninitialized: false,
  cookie: {
    // 세션이 언제 만료되는지 1/1000초 단위로 작성 = 1000 = 1초
    maxAge: 3000000
  },
  // database 연결
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  })
}));
app.use((0, _expressFlash["default"])());
app.use(_middlewares.localsMiddlewares);

//  Express에 내장된 미들웨어 기능 : express.static()
// staic()에는 노출시키고 싶은 폴더의 이름
app.use("/uploads", _express["default"]["static"]("uploads"));
app.use("/static", _express["default"]["static"]("assets"));
app.use("/", _rootRouter["default"]);
app.use("/videos", _videoRouter["default"]);
app.use("/users", _userRouter["default"]);
app.use("/api", _apiRouter["default"]);
var _default = app;
exports["default"] = _default;