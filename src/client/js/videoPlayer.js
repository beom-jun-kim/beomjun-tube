const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreenBtn");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

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
  playBtn.innerText = video.paused ? "Play" : "Pause";
};


// Mute
const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : video.volume;
};

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;

  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = volumeValue;

  if (Number(value) === 0) {
    muteBtn.innerText = "Unmute";
    video.muted = true;
  } else {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
};


// Time
const formatTime = (sec) => {
  return new Date(sec * 1000).toISOString().substring(14, 19);
};

const handleLoadedMetadata = (e) => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = (e) => {

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
const handleFullscreen = (e) => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    // exit하고 innerText를 enter로 바꿈
    // document.fullscreenElement는 그냥 전체화면인지 아닌지 알려주는 요소일 뿐이다
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
  }
};


// Mouse Move
// 커서를 움직일시 visible이벤트가 실행되고 멈추면 
// if문에 있는 controlsMovementTimeout가 실행된다
const handleMouseMove = (e) => {
  
  // 비디오 ele 내에서 커서를 움직일때
  if(controlsMovementTimeout) {
    
    // clearTimeout : 함수가 항상 한번만 실행하도록
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("visible");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const hideControls = () => videoControls.classList.remove("visible");

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handletimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
video.addEventListener("mousemove", handleMouseMove);


// 챌린지
// 1 . 화면 클릭 재생
// 2. space 사용 재생
// 3. css