const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");

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
const handleLoadedMetadata = (e) => {
    totalTime.innerText = Math.floor(video.duration);
};

const handleTimeUpdate = (e) => {
    currenTime.innerText = Math.floor(video.currentTime);
}

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
