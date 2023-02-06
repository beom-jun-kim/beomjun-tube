import userModel from "../models/user.js";
import bcrypt from "bcrypt"; /* 얘의 매소드를 쓰려면 임포트 해야함 */

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { name, username, email, loction, password, password2 } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    // return 을 붙이는 이유 : 붙이지 않으면 코드가 계속 진행된다
    return res.status(400).render("join", {
      pageTitle,
      error_message: "비밀번호가 일치하지 않습니다",
    });
  }
  const exists = await userModel.exists({
    $or: [{ username }, { email }],
  }); /* 존재유무확인 */
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      error_message: "이미 존재하는 아이디 또는 이메일 입니다",
    });
  }
  try {
    await userModel.create({
      name,
      username,
      password,
      loction,
      email,
    });
    console.log("dfdfd", req.body);
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle,
      error_message: Error._Message,
    });
  }
};
export const edit = (req, res) => res.render("Edit USer");

export const remove = (req, res) => res.render("Remove User");

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      error_message: "존재하지 않는 아이디입니다",
    });
  }

  //유저가 입력한 비밀번호와 해시된 비밀번호 비교
  const match = await bcrypt.compare(password, user.password);
  if(!match) {
    return res.status(400).render("login", {
      pageTitle,
      error_message: "존재하지 않는 비밀번호입니다",
    });
  }
  return res.redirect("/");
};

export const logout = (req, res) => res.render("logout");

export const see = (req, res) => res.render("see");
