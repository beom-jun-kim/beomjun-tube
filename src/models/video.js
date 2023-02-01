// db를 mongoose와 연결시켜서 video model을 인식
// model을 만드는 이유 : DB의 구조에 대해 알려줘야 함
import mongoose from "mongoose";

// 스키마 : 데이터의 형태 정의
const videoSchema = new mongoose.Schema({

  // 누군가 홈페이지를 해킹하거나 개발자도구로 조작을 할 수도 있으니 database에 옵션 설정
  title: { type: String, required: true, maxLength: 30 },
  description: { type: String, required: true, maxLength: 150 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

// model의 이름과 schema
const movieModel = mongoose.model("Video", videoSchema);
export default movieModel;
