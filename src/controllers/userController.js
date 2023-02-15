import userModel from "../models/user.js";
import fetch from "node-fetch";
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
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle,
      error_message: Error._Message,
    });
  }
};

export const getEdit = async (req, res) => {
  // session에서 user를 찾고 user에서 id를 찾는다
  // 혼합하기 좋은 문법 (ES6)
  // (const id = req.session.user.id와 같음)

  // 지금 상황에서는 user는 업데이트 했는데 session이 업데이트 되지 않을 것이다 (session은 DB와 연결되어있지 않다)
  const {
    session: {
      user: { _id },
    },
    body: { name, username, email, location },
  } = req;

  await userModel.findByIdAndUpdate(_id, {
    name,
    username,
    email,
    location,
  });
  return res.render("edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = (req, res) => {
  return res.redirect("/");
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await userModel.findOne({
    username,
    socialOnly: false /* github로 로그인했는지 웹사이트 아이디로 로그인 했는지 잊어버리기 때문에 */,
  });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      error_message: "존재하지 않는 아이디입니다",
    });
  }

  //유저가 입력한 비밀번호와 해시된 비밀번호 비교
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).render("login", {
      pageTitle,
      error_message: "존재하지 않는 비밀번호입니다",
    });
  }

  // 세션에 정보를 추가 ↓
  // 세션을 수정하는 곳 (초기화 하는 부분)
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GIT_CLIENT_ID,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";

  // POST Request를 할 때, 반드시 필요한 파라미터들 : client_id, client_secret, code
  // 얘네들을 access_token 으로 바꾼다
  const config = {
    client_id: process.env.GIT_CLIENT_ID,
    client_secret: process.env.GIT_CLIENT_SECRET,

    // req.query는 code를 받는다 : 유효기간은 10분
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",

      // JSON을 return받기 위해서 이걸 보내야함 : 그렇지 않을시 github이 text로 응답
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  // https://api.github.com/user 를 통해 인증을 위한 access_token을 보내줘야됨
  // access_token을 이용해 github api로 이동
  // access_token은 scope에 적은 내용에 대해서만 허용
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    console.log("userData", userData);

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    console.log("emailData", emailData);

    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );

    if (!emailObj) {
      return res.redirect("/login");
    }

    // "해당 email을 가진 user가 이미 있는지 찾고" 로그인 승인
    // "같은 email을 가진 user가 이미 있다면" 그 유저를 로그인 시켜줌
    // 다시 깃헙이 주는 list에서 primary이면서 verified된 email 객체를 찾아야한다
    let user = await userModel.findOne({ email: emailObj.email });
    if (!user) {
      user = await userModel.create({
        name: userData.name,
        username: userData.login,
        password: "",

        // github을 이용해 계정을 만들었다면 password는 없다
        // 그렇게 되면 username과 password form을 사용할 수 없다
        socialOnly: true,
        loction: userData.loction,
        email: emailObj.email,
      });
    }

    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const see = (req, res) => res.render("see");
