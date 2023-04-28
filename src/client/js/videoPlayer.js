const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const playBtnIcon = playBtn.querySelector("i");
const muteBtnIcon = muteBtn.querySelector("i");
const fullScreenIcon = fullScreenBtn.querySelector("i.fas.fa-expand");

let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

// Play
const handlePlay = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

// Mute
const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : video.volume;
};

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;

  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = "fas fa-volume-mute";
  }

  volumeValue = value;
  video.volume = volumeValue;

  if (video.volume === 0) {
    video.muted = true;
    muteBtnIcon.classList = "fas fa-volume-mute";
  } else {
    video.muted = false;
    muteBtnIcon.classList = "fas fa-volume-up";
  }
};

// Time
const formatTime = (sec) => {
  return new Date(sec * 1000).toISOString().substring(14, 19);
};

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));  
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {

  // formatTime : 숫자(날짜)들을 가져오는 방법
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

// Timeline
const handletimelineChange = (e) => {
  const {
    target: { value },
  } = e;
  video.currentTime = value;
};

// Full screen
const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    // exit하고 innerText를 enter로 바꿈
    // document.fullscreenElement는 그냥 전체화면인지 아닌지 알려주는 요소일 뿐이다
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};

// Mouse Move
// 커서를 움직일시 visible이벤트가 실행되고 멈추면
// if문에 있는 controlsMovementTimeout가 실행된다
const handleMouseMove = (e) => {
  // 비디오 ele 내에서 커서를 움직일때
  if (controlsMovementTimeout) {
    // clearTimeout : 함수가 항상 한번만 실행하도록
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("visible");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const hideControls = () => videoControls.classList.remove("visible");

const handleEnded = () => {
  const { id } = videoContainer.dataset;

  // post request는 data를 필요로 한다
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadeddata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
timeline.addEventListener("input", handletimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
videoContainer.addEventListener("mousemove", handleMouseMove);

// 챌린지
// 1 . 화면 클릭 재생
// 2. space 사용 재생
// 3. css
