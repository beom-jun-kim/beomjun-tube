require('dotenv').config();
import "./db.cjs";
import "./models/video.js";
import "./models/user.js";
import "./models/comment.js"
import app from "./server.cjs";

const PORT = 4000;

const handleListening = () => {console.log(`hi http://localhost:${PORT}`)};
app.listen(PORT, handleListening);
