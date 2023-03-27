import dotenv from 'dotenv';
dotenv.config();
require("./db.js");
require("./models/video.js")
require("./models/user.js")
require("./models/comment.js")
require("./server.js")
// import "./models/user.js";
// import "./models/comment.js"
// import app from "./server.js";

const PORT = 4000;

const handleListening = () => {console.log(`hi http://localhost:${PORT}`)};
app.listen(PORT, handleListening);
