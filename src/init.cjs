import "dotenv/config";
import "./db.cjs";
import "./models/video.cjs";
import "./models/user.cjs";
import "./models/comment.cjs";
import app from "./server.cjs";

// 내컴퓨터에서는 4000 , heroku에서 실행될때는 port변수
const PORT = process.env.PORT || 4000;

const handleListening = () => {
  console.log(`hi http://localhost:${PORT}`);
};
app.listen(PORT, handleListening);
