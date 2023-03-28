import express from "express";
import {
  watch,
  getEdit,
  deleteVideo,
  postEdit,
  getUpload,
  postUpload,
} from "../controllers/videoControllers.js";
import { protectorMiddleware, videoUpload } from "../middlewares.mjs";

const videoRouter = express.Router();

// 위치중요, upload를 제일 위에 둔 이유는
// :id가 위에 있을경우 express가 upload를 :id로 인식 해버린다(위에서 밑으로 읽는다)
// (\\d+) : 숫자만 인식, 자바스크립트이기에 / 하나 더 추가
videoRouter.get("/:id([0-9a-f]{24})", watch);

videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(
    videoUpload.fields([
      
      // fields : 두개 이상의 파일을 업로드 할때
      // 배열로 선언되며 그 배열안에는 두개의 객체가 들어간다
      { name: "video", maxCount: 1 },
      { name: "thumb", maxCount: 1 },
    ]),
    postUpload
  );

videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit);

videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(deleteVideo);

export default videoRouter;
