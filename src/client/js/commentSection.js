const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const commentList = document.querySelector(".comment");
const deleteBtn = document.getElementById("deleteBtn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comment-box ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "X";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);

  // prepend : 새로 생성된 ele가 제일 위로
  videoComments.prepend(newComment);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const input = form.querySelector("input");
  const text = input.value;
  const videoId = videoContainer.dataset.id;

  // input에 아무것도 없으면 submit X
  if (text === "") {
    return;
  }

  // fetch는 js를 통해서 request를 보낼 수 있게 해준다
  // 보낸 데이터가 JSON인지 쿼리 문자열인지 API에 알려주는 Content-type을 지정
  //video.controllers 227열이랑 이어짐: 프론트엔드에 도착하면 response로 받아서
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",

    // backend에게 json을 보낸다고 알려주는 obj
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
  
  //위 36열이랑 이어짐 : status를 검사. await를 써서 json으로 메시지 추출
  if (response.status === 201) {
    input.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDelete = async (e) => {
  const commentId = commentList.dataset.id;
  const reponse = await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
  });
  if(reponse.status === 201) {
    const comment = e.target.parentElement;
    comment.remove();
  }
}

if (form) {
  form.addEventListener("submit", handleSubmit);
  deleteBtn.addEventListener("click",handleDelete);
}