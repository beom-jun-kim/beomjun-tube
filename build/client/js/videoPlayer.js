"use strict";

var video = document.querySelector("video");
var playBtn = document.getElementById("play");
var muteBtn = document.getElementById("mute");
var volumeRange = document.getElementById("volume");
var currenTime = document.getElementById("currenTime");
var totalTime = document.getElementById("totalTime");
var timeline = document.getElementById("timeline");
var fullScreenBtn = document.getElementById("fullScreen");
var videoContainer = document.getElementById("videoContainer");
var videoControls = document.getElementById("videoControls");
var playBtnIcon = playBtn.querySelector("i");
var muteBtnIcon = muteBtn.querySelector("i");
var fullscreenIcon = fullScreenBtn.querySelector("i.fas.fa-expand");
var controlsMovementTimeout = null;
var volumeValue = 0.5;
video.volume = volumeValue;

// Play
var handlePlay = function handlePlay(e) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

// Mute
var handleMute = function handleMute(e) {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : video.volume;
};
var handleVolumeChange = function handleVolumeChange(e) {
  var value = e.target.value;
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
var formatTime = function formatTime(sec) {
  return new Date(sec * 1000).toISOString().substring(14, 19);
};
var handleLoadedMetadata = function handleLoadedMetadata() {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};
var handleTimeUpdate = function handleTimeUpdate() {
  // formatTime : 숫자(날짜)들을 가져오는 방법
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

// Timeline
var handletimelineChange = function handletimelineChange(e) {
  var value = e.target.value;
  video.currentTime = value;
};

// Full screen
var handleFullscreen = function handleFullscreen() {
  var fullscreen = document.fullscreenElement;
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
var handleMouseMove = function handleMouseMove(e) {
  // 비디오 ele 내에서 커서를 움직일때
  if (controlsMovementTimeout) {
    // clearTimeout : 함수가 항상 한번만 실행하도록
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("visible");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};
var hideControls = function hideControls() {
  return videoControls.classList.remove("visible");
};
var handleEnded = function handleEnded() {
  var id = videoContainer.dataset.id;

  // post request는 data를 필요로 한다
  fetch("/api/videos/".concat(id, "/view"), {
    method: "POST"
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