import userModel from "../models/user.js";

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
  await userModel.create({
    name,
    username,
    password,
    loction,
    email,
  });
  console.log("dfdfd", req.body);
  return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit USer");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see");
