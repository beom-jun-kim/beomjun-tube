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
  // sort() : 어떻게 정렬할 것인지
  // desc : 내림차순 (가장 최근것이 젤 위로) , asc : 오름차순 (가장 예전것이 젤 위로)
  const videos = await movieModel.find({}).sort({ createdAt: "desc" });
  console.log(videos);
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await movieModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await movieModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;

  // exists() : 존재 유무 확인 (video obj가 필요없음)
  const video = await movieModel.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
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

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await movieModel.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await movieModel.find({

      // regex 연산자 : regular expression의 약자 (정규식표현에서 쓰는)
      // 몽고DB에서 정규표현식을 사용하기 위해 사용하는 키워드
      title: {

        // https://www.mongodb.com/docs/manual/reference/operator/query-comparison/
        // RegExp 생성자는 패턴을 사용해 텍스트를 판별할 때 사용
        // i : 대.소문자 구분X  ( ignore case 무시하다라는 뜻)
        // ^$ : keyword로 '시작하는' 제목
        // ${keyword}$ : keyword로 '끝나는' 제목
        $regex: new RegExp(`^${keyword}`, "i")
      },
    });
  }
  // req.query에서 검색어를 받는다
  return res.render("search", { pageTitle: "Search", videos });
};

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
