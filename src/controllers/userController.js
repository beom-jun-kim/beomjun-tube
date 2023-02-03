export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};
export const postJoin = (req, res) => {
  console.log("안녕 나는 요청을 했어",req.body);
  res.end();
};
export const edit = (req, res) => res.send("Edit USer");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see");
