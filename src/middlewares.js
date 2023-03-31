import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({

  // aws id와 aws secret 둘다 옵션으로 전달
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey:process.env.AWS_SECRET,
  }
})

// production 은 heroku 환경 , development은 로컬 환경
const isHeroku = process.env.NODE_ENV === "production"

const s3ImageUploader = multerS3({
  s3:s3,
  bucket:"beomjun-tube/images",
  acl: 'public-read',
})

const s3VideoUploader = multerS3({
  s3:s3,
  bucket:"beomjun-tube/videos",
  acl: 'public-read',

  // ios에서 영상 재생
  contentType: multerS3.AUTO_CONTENT_TYPE,
})

export const localsMiddlewares = (req, res, next) => {
  // 왜 res.locals에 담아서 하는가?
  // res에 locals이라는 obj가 있는데 템플릿에서 locals에 접근 가능 (템플릿과 data 공유)

  // 브라우저마다 다른 결과를 나타낸다 (session ID)
  // 템플릿에 변수를 전역적으로 보낼 수 있다(render로 보내지 않아도 됨 ) : res.locals.변수명 = "변수내용";
  // locals obj는 이미 모든 템플릿에 import 된 obj이다
  // locals에 로그인한 사용자를 추가할 때 사용 할 것이다
  // localsMiddlewares는 req.session에 접근 가능
  // localsMiddlewares session은 미들웨어 다음에 오기 때문에 가능
  // locals는 res에 있고 session은 req에 있다 (session엔 user가 있다)
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "webtube";

  // session.user 값 템플릿과 공유
  res.locals.loggedInUser = req.session.user || {};
  res.locals.isHeroku = isHeroku;
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error","로그인이 되어있지 않습니다");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error","로그인이 되어있습니다");
    return res.redirect("/");
  }
};

// dest 또는 storage: 파일을 저장할 위치
// gitignore에 경로 추가
// db에 파일을 저장하면 안됨. 파일의 위치를 저장 : db는 파일 저장을 위한게 아니다
// limits : fileSize (multer 옵션) , 파일 최대 크기 지정
export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: { fileSize: 5000000 },
  storage: isHeroku ? s3ImageUploader : undefined,
});
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: { fileSize: 7000000 },
  storage: isHeroku ? s3VideoUploader : undefined,
});
