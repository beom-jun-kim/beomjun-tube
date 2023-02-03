import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  // unique : 딱 하나만 존재하게
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: String,
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model("userModel", userSchema);

export default User;
