import dotenv from 'dotenv';
dotenv.config();
import "./db";
import "./models/video";
import "./models/user";
import "./models/comment"
import app from "./server";

const PORT = 4000;

const handleListening = () => {console.log(`hi http://localhost:${PORT}`)};
app.listen(PORT, handleListening);
