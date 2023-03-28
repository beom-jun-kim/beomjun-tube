import dotenv from "dotenv";
dotenv.config();
import "./db.mjs";
import "./models/video.mjs";
import "./models/user.mjs";
import "./models/comment.mjs";
import app from "./server.mjs";

const PORT = 4000;

const handleListening = () => {
  console.log(`hi http://localhost:${PORT}`);
};
app.listen(PORT, handleListening);
