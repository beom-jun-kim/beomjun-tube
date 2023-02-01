import express from "express";
import {
  watch,
  getEdit,
  deleteVideo,
  postEdit,

  getUpload,
  postUpload
} from "../controllers/videoControllers.js";

const videoRouter = express.Router();

// 위치중요, upload를 제일 위에 둔 이유는
// :id가 위에 있을경우 express가 upload를 :id로 인식 해버린다(위에서 밑으로 읽는다)
// (\\d+) : 숫자만 인식, 자바스크립트이기에 / 하나 더 추가
videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
