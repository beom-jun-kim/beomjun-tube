const require = createRequire(import.meta.url);
require("dotenv").config();

import "dotenv/config";
import "./db.js";
import "./models/video.js";
import "./models/user.js";
import "./models/comment.js"
import app from "./server.js";

const PORT = 4000;

const handleListening = () => {console.log(`hi http://localhost:${PORT}`)};
app.listen(PORT, handleListening);
