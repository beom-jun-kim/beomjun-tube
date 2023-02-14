import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  // unique : 딱 하나만 존재하게
  name: { type: String, required: true },

  // user가 github로 로그인했는지 여부를 알기위해
  // 로그인 페이지에서 유저가 email로 로그인하려는데 password가 없을때 유용
  socialOnly: { type: Boolean, default: false },

  username: { type: String, required: true, unique: true },
  password: { type: String },
  location: String,
  email: { type: String, required: true, unique: true },
});

// 저장전에 잠깐 가로채서 작업
userSchema.pre("save", async function () {
  // hash function 인자 (유저가 입력한 password, 해싱횟수, 콜백함수는 필요x await를 쓰고 있으니.)
  // this는 create 되는 user를 가르킨다 (암호화를 시킨다음 저장)
  this.password = await bcrypt.hash(this.password, 5);
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
