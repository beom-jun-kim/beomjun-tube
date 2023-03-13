const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  // textarea에 아무것도 없으면 submit X
  if (text === "") {
    return;
  }

  // fetch는 js를 통해서 request를 보낼 수 있게 해준다
  // 보낸 데이터가 JSON인지 쿼리 문자열인지 API에 알려주는 Content-type을 지정
  fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",

    // express.json()은 header에 Content-Type이 
    // express.json()의 기본 값인 "application/json"과 일치하는 
    // request만 보는 미들웨어를 반환
    headers: {
      "Content-Type": "application/json",
    },

    // 문자열로 변경 (프론트엔드).
    // 이 문자열 형태로 된 데이터를 json한다
    body: JSON.stringify({ text }),
  });
  textarea.value="";
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
