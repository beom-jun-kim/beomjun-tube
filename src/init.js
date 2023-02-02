import "./db.js";
import "./models/video.js";
import app from "./server.js";

const PORT = 4000;

const handleListening = () => {console.log(`hi http://localhost:${PORT}`)};
app.listen(PORT, handleListening);
