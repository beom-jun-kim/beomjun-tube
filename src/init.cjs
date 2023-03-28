import dotenv from "dotenv.cjs";
dotenv.config();
import "./db.cjs";
import "./models/video.cjs";
import "./models/user.cjs";
import "./models/comment.cjs";
import app from "./server.cjs";

const PORT = 4000;

const handleListening = () => {
  console.log(`hi http://localhost:${PORT}`);
};
app.listen(PORT, handleListening);
