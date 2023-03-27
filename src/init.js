import esbuild from "esbuild";
import "dotenv/config";
import "./db.js";
import "./models/video.js";
import "./models/user.js";
import "./models/comment.js"
import app from "./server.js";

const express = require("express");
const app = express();
const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["./src/init.js"],
  outfile: "./build/init.js",
  bundle: true,
  minify: true,
  sourcemap: true,
}).catch(() => process.exit(1));

const PORT = 4000;

const handleListening = () => {console.log(`hi http://localhost:${PORT}`)};
app.listen(PORT, handleListening);
