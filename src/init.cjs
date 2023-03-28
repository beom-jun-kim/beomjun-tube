var _module = require("module");
const require = createRequire(import.meta.url);
require("dotenv").config();
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
