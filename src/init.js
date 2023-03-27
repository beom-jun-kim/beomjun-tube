import {} from "./db.js";
import {} from "./models/video.mjs";
import {} from "./models/user.mjs";
import {} from "./models/comment.mjs"
import app from "./server.mjs";
import "dotenv/config";

const PORT = 4000;

const handleListening = () => {console.log(`hi http://localhost:${PORT}`)};
app.listen(PORT, handleListening);
