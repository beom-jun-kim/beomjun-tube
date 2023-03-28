import "dotenv/config";
import "./db.mjs";
import "./models/video.js";
import "./models/user.js";
import "./models/comment.js";
import app from "./server.mjs";

// 내컴퓨터에서는 4000 , heroku에서 실행될때는 port변수
const PORT = process.env.PORT || 4000;

const handleListening = () => {
  console.log(`hi http://localhost:${PORT}`);
};
app.listen(PORT, handleListening);
