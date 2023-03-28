import movieModel from "../models/video.cjs";
import userModel from "../models/user.cjs";
import commentModel from "../models/comment.cjs";

/* 

※callback

console.log("시작");
movieModel.find({}, (error, videos) => {
  if(error){
    return res.render("server-error")
  }
  return res.render("home", { pageTitle: "Home", videos });
}); 
console.log("끝"); ===> 순서가 이상해짐

*/

// ※비동기
// async(비동기) -- await(수행될 때까지 기다려준다)
// 데이터베이스가 데이터 찾을때까지 기다려준다(다음 것이 먼저 수행되는 것을 막음)
// 에러는 try-catch문으로 잡는다.
export const home = async (req, res) => {
  // sort() : 어떻게 정렬할 것인지
  // desc : 내림차순 (가장 최근것이 젤 위로) , asc : 오름차순 (가장 예전것이 젤 위로)
  // const videos = await movieModel.find({}).sort({ createdAt: "desc" });
  const videos = await movieModel
    .find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;

  // populate() : 다른 컬렉션의 문서로 자동 교체하는 프로세스.
  // owner부분을 실제 userModel 데이터를 +하여 채워준다
  // mongoose는 object id 가 userModel로 부터 온 것임을 안다
  const video = await (
    await movieModel.findById(id).populate("owner")
  ).populate("comments");

  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    session: {
      user: { _id },
    },
  } = req;
  const video = await movieModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }

  // 같은 type으로 지정해주지 않으면 서로 type이 달라 영상 소유주에게도 이 코드가 적용되는 버그가 일어남
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "회원님께서 업로드한 영상이 아닙니다");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    session: {
      user: { _id },
    },
  } = req;
  const { title, description, hashtags } = req.body;

  // exists() : 존재 유무 확인 (video obj가 필요없음)
  // mongoose 최신버전에서는 exists가 사라짐
  const video = await movieModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  // findByIdAndUpdate(): 두개의 인자 id, 내용
  await movieModel.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: movieModel.formatHashtags(hashtags),
  });

  return res.redirect("/");
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    session: {
      user: { _id },
    },
  } = req;
  const video = await movieModel.findById(id);
  // const user = await User.findById(_id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await movieModel.findByIdAndDelete(id);
  // user.videos.splice(user.videos.indexOf(id),1):
  // user.save();
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await movieModel
      .find({
        // regex 연산자 : regular expression의 약자 (정규식표현에서 쓰는)
        // 몽고DB에서 정규표현식을 사용하기 위해 사용하는 키워드이다
        title: {
          // https://www.mongodb.com/docs/manual/reference/operator/query-comparison/
          // RegExp 생성자는 패턴을 사용해 텍스트를 판별할 때 사용dfdfd
          // i : 대.소문자 구분X  ( ignore case 무시하다라는 뜻)
          // ^$ : keyword로 '시작하는' 제목
          // ${keyword}$ : keyword로 '끝나는' 제목
          $regex: new RegExp(`^${keyword}`, "i"),
        },
      })
      .populate("owner");
  }
  // req.query에서 검색어를 받는다
  return res.render("search", { pageTitle: "Search", videos });
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;

  // file안에는 path가 있다
  // es6문법 : const { path: fileUrl } = req.file;
  // file이 한개일때는 file , 두개 이상일때는 files
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await movieModel.create({
      // type의 유효성 검사: 선언한 type과 다르게 선언해도 mongoose가 올바르게 자동변환
      // id는 몽구스에서 부여해준다

      // 업로드 될 영상의 id를 user model에도 저장해 줘야한다
      title,
      description,
      fileUrl: video[0].path,

      // Windows의 path는 백슬래시를 사용..? 하기에 replace /로 변경
      // replace(/[찾을 문자열]/g, "변경할 문자열")
      // g : 전체 모든 문자열 변경 / i : 영문 대소문자 무시
      // []안에 특수기호를 넣으면 개별적으로 변환
      thumbnailUrl: thumb[0].path.replace(/[\\]/g, "/"),
      owner: _id,
      hashtags: movieModel.formatHashtags(hashtags),
    });
    const user = await userModel.findById(_id);

    // user model의 videos array에 newVideo._id를 넣는다
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: Error._Message,
    });
  }
};

// 1. return의 역할 : 본질적인 return의 역할보다는 function을 마무리짓는 역할로 사용되고 있음.
// - 이러한 경우 return이 없어도 정상적으로 동작하지만 실수를 방지하기 위해 return을 사용
// 2. render한 것은 다시 render할 수 없음
// - redirect(), sendStatus(), end() 등등 포함 (express에서 오류 발생)

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await movieModel.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    body: { text },
    session: { user },
    params: { id },
  } = req;

  const video = await movieModel.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await commentModel.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  video.save();

  // 201 : created(생성됨) - 요청이 완료되었고 결과로 새로운 리소스를 생성
  // json으로 정보를 보낸다 : res.json([body]) JSON response를 보냅니다.
  // 이 메서드는 JSON.stringify()를 사용하여 JSON 문자열로 변환된 매개변수인 response를 보낸다
  // frontend에게 새로 생긴 댓글의 id를 보내기 위해
  return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    params: { id },
  } = req;

  const comment = await commentModel.findById(id);

  if (String(comment.owner) !== String(_id)) {
    req.flash("error", "You are not the owner of video.");
    return res.status(403).redirect("/");
  }
  await commentModel.findByIdAndDelete(id);
  const commentsOwner = await userModel.findById(_id);
  commentsOwner.save();
  return res.sendStatus(201);
};
