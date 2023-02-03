import "./db.js";
import "./models/video.js";
import express from "express";
import morgan from "morgan";

// default 로 선언했기 때문에 이름을 어떤 것으로 하든 상관X
import rootRouter from "./routers/rootRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";

const app = express();

const logger = morgan("dev");

app.set("view engine", "pug"); /* express는 views 디렉토리에서 pug를 찾는다 */
app.set("views", process.cwd() + "/src/views"); /* 디폴트 값에서 변경 /src 추가 */

app.use(logger);

//- express.js > express.urlencoded() > 
//- extended : body에 있는 정보들을 보기 좋게 형식을 갖춰준다(form의 데이터를 줄것이다)
// middleware는 route를 사용하기 전에 사용해야한다
// html form을 이해하고 form의 value들을 우리가 이해할 수 있는 js obj형식으로 변형
// express에 내장된 미들웨어 기능.
// 데이터 파싱기능
app.use(express.urlencoded({extended:true}))
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;