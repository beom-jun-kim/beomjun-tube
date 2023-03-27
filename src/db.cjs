import mongoose from "mongoose";

// database에 연결
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose가 connection에 대한 액세스를 줌
const db = mongoose.connection;

// on : 여러번 계속 발생시킬 수 있다 . 클릭 이벤트
// once : 한번만 발생
const handleOpen = () => console.log("connected to DB ✔");
const handleError = () => console.log("DB Error", error);
db.on("error", handleError);
db.once("open", handleOpen);

// CRUD
// c : create
// r : read
// u : update
// d : delete
