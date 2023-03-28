var _module = require("module");
const require = createRequire(import.meta.url);
require("dotenv").config();
const db = require("./db.cjs");
const video = require("./models/video.cjs");
const user = require("./models/user.cjs");
const comment = require("./models/comment.cjs");
const app = require("./server.cjs");
// import "./db.cjs";
// import "./models/video.cjs";
// import "./models/user.cjs";
// import "./models/comment.cjs";
// import app from "./server.cjs";

const PORT = 4000;

const handleListening = () => {
  console.log(`hi http://localhost:${PORT}`);
};
app.listen(PORT, handleListening);
db.listen(PORT, handleListening);
video.listen(PORT, handleListening);
user.listen(PORT, handleListening);
comment.listen(PORT, handleListening);
