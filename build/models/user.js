import bcrypt from "bcrypt";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  // unique : 딱 하나만 존재하게
  name: {
    type: String,
    required: true
  },
  // user가 github로 로그인했는지 여부를 알기위해
  // 로그인 페이지에서 유저가 email로 로그인하려는데 password가 없을때 유용
  socialOnly: {
    type: Boolean,
    default: false
  },
  avatarUrl: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  location: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  // 한명의 유저가 여러개의 비디오를 가지고 있으니 array로 (video model의 obj id로 채운다)
  // video model에 연결된 obj id로 구성된 array
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video"
  }]
});

// 저장전에 잠깐 가로채서 작업
userSchema.pre("save", async function () {
  // 특정 조건에서만 비밀번호가 hash되도록 만들어줘야한다(비번이 수정되었을 경우에만)
  if (this.isModified("password")) {
    // this는 create 되는 user를 가르킨다 (암호화를 시킨다음 저장)
    // hash function 인자 (유저가 입력한 password, 해싱횟수, 콜백함수는 필요x await를 쓰고 있으니.)
    this.password = await bcrypt.hash(this.password, 5);
  }
});
const userModel = mongoose.model("User", userSchema);
export default userModel;