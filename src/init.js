import dotenv from "dotenv";
dotenv.config();
import db from "./db.mjs";
import Video from "./models/video.mjs";
import User from "./models/user.mjs";
import Comment from "./models/comment.mjs";
import app from "./server.mjs";
const PORT = 4000;

const handleListening = () => {
  console.log(`hi http://localhost:${PORT}`);
};
app.listen(PORT, handleListening);
