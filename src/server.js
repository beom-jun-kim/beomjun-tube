import "./db.js";
import "./models/video.js";
import express, { application } from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

// default 로 선언했기 때문에 이름을 어떤 것으로 하든 상관X
import rootRouter from "./routers/rootRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";
import { localsMiddlewares } from "./middlewares.js";

const app = express();

const logger = morgan("dev");

app.set("view engine", "pug"); /* express는 views 디렉토리에서 pug를 찾는다 */
app.set(
  "views",
  process.cwd() + "/src/views"
); /* 디폴트 값에서 변경 /src 추가 */

app.use(logger);

//- express.js > express.urlencoded() >
//- extended : body에 있는 정보들을 보기 좋게 형식을 갖춰준다(form의 데이터를 줄것이다)
// middleware는 route를 사용하기 전에 사용해야한다
// html form을 이해하고 form의 value들을 우리가 이해할 수 있는 js obj형식으로 변형
// express에 내장된 미들웨어 기능.
// 데이터 파싱기능
app.use(express.urlencoded({ extended: true }));

// session 저장소
// route 사용하기 전에 사용(middleware이니까)
// 이 미들웨어가 사이트로 들어오는 모두를 기억
// 브라우저가 서버에 요청 > 서버는 session 미들웨어가 브라우저한테 텍스트를 보낸다
// 방문시 express가 세션 id 생성 > 브라우저가 받음 > 쿠키에 세션 id 저장 > express에서도 해당 세션 DB에 저장(서버가 재부팅되면 초기화되기에)
app.use(
  session({

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
      maxAge:10000,
    },

    // database 연결
    store: MongoStore.create({mongoUrl: process.env.DB_URL}),
  })
);

app.use(localsMiddlewares);

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;

// test test test test
