import userModel from "../models/user.js";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { name, username, email, loction, password } = req.body;
  await userModel.create({
    name,
    username, 
    password,
    loction, 
    email, 
  });
  return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit USer");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see");
