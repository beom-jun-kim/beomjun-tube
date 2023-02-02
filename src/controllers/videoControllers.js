import movieModel from "../models/video.js";

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
  const videos = await movieModel.find({});
  console.log(videos);
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await movieModel.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await movieModel.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;

  // exists() : 영상의 존재 유무 확인 (video obj가 필요없음)
  const video = await movieModel.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }

  // findByIdAndUpdate(): 두개의 인자 id, 내용
  await movieModel.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: movieModel.formatHashtags(hashtags),
  });

  // 브라우저가 자동으로 이동하도록 하는 것
  return res.redirect(`/videos/${id}`);
};

export const deleteVideo = (req, res) => {
  return res.send("delete video");
};

export const search = (req, res) => res.send("search video");

export const upload = (req, res) => res.send("upload video");

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await movieModel.create({
      // type의 유효성 검사: 선언한 type과 다르게 선언해도 mongoose가 올바르게 자동변환
      // id는 몽구스에서 부여해준다
      title,
      description,
      hashtags: movieModel.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: Error._Message,
    });
  }
};

// 1. return의 역할 : 본질적인 return의 역할보다는 function을 마무리짓는 역할로 사용되고 있음.
// - 이러한 경우 return이 없어도 정상적으로 동작하지만 실수를 방지하기 위해 return을 사용
// 2. render한 것은 다시 render할 수 없음
// - redirect(), sendStatus(), end() 등등 포함 (express에서 오류 발생)
