import "./db.js";
import "./models/video.js";
import express, { application } from "express";
import morgan from "morgan";
import session from "express-session";

// default 로 선언했기 때문에 이름을 어떤 것으로 하든 상관X
import rootRouter from "./routers/rootRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";
import { localsMiddlewares } from "./middlewares.js";

const app = express();

const logger = morgan("dev");

app.set("view engine", "pug"); /* express는 views 디렉토리에서 pug를 찾는다 */
app.set("views",process.cwd() + "/src/views"); /* 디폴트 값에서 변경 /src 추가 */

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
    secret: "안녕. 만나서 반가워",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(localsMiddlewares);

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;


// test test test test test