const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
    const a = document.createElement("a");
    a.herf = videoFile;
    a.download = "나의녹화파일.wewbm";
    document.body.appendChild(a);
    a.click();
};

const handleStop = () => {
  startBtn.innerText = "녹화하기";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "녹화중지";
  startBtn.removeEventListener("click", handleStart);

  startBtn.addEventListener("click", handleStop);

  // MediaRecorder : 미디어를 쉽게 녹화할 수 있는 기능 제공
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
  // 새 MediaRecorder 개체생성
  recorder = new window.MediaRecorder(stream);

  // ondataavailable : 녹화가 멈추면 발생되는 event
  recorder.ondataavailable = (e) => {

    // URL.createObjectURL() : URL을 DOMString으로 반환
    let videoFile = URL.createObjectURL(e.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};

const init = async () => {
  // MediaDevices.getUserMedia() : 유저에게 미디어 입력 장치 사용 권한 요청, 수락시 요청한 미디어 종류의 트랙을 포함한 MediaStream 반환
  // MediaStream : 카메라 , 비디오 , 녹화장치 , 스크린 공유 장치
  // constraints를 인자로 받는다 constraints는 audio: boolean , video: boolean
  // https://developer.mozilla.org/ko/docs/Web/API/MediaDevices/getUserMedia
  // npm i regenerator-runtime 설치
  let stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 500, height: 500 },
  });
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);
