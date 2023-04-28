import "dotenv/config";
import "./db.js";
import "./heroku.js"
import "./models/video.js";
import "./models/user.js";
import "./models/comment.js";
import app from "./server.js";

// 내컴퓨터에서는 4000 , heroku에서 실행될때는 port변수
const PORT = process.env.PORT || 4000;

const handleListening = () => {
  console.log(`SERVER http://localhost:${PORT}`);
};
app.listen(PORT, handleListening);


// 수정사항
// 1. sns로그인 (카카오톡 로그인 추가)
// 2. 영상 재생 에러 (플레이바)
// 3. css 전면 수정