import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { async } from "regenerator-runtime";

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = async () => {
  // https://github.com/ffmpegwasm/ffmpeg.wasm
  // log:true : 콘솔에서 현재 진행상황 확인
  const ffmpeg = createFFmpeg({ log: true });

  // 소프트웨어가 무거울 수 있기에 기다려줘야함
  // 사용자가 소프트웨어를 사용할 것이기 때문
  await ffmpeg.load();

  // writeFile : ffmpeg 가상의 어떤 곳에 파일 생성
  // rec.webm : 파일명. 맘대로 해도 됨
  // binaryData : videoFile
  ffmpeg.FS("writeFile", "rec.webm", await fetchFile(videoFile));

  // ffmpeg.run : 가상 컴퓨터에 이미 존재하는 파일을 input(-i)으로 받는다
  // -r 60 : 초당 60프레임으로 인코딩
  await ffmpeg.run("-i", "rec.webm", "-r", "60", "output.mp4");

  // readFile : 데이터 읽기
  const mp4file = ffmpeg.FS("readFile", "output.mp4");

  // Uint8Array(양의 정수 8비트 배열) , buffer 배열 반환 (데이터)
  // 이 배열로부터 blob을 만들어내야한다
  // blob : 파일류의 불변하는 미가공 데이터
  // rqw data(미가공 데이터) 즉, binary data에 접근하려면 mp4file.buffer 사용
  // buffer는 arrayBuffer 반환 , arrayBuffer는 raw binary data를 나타내는 obj
  // new Blob()는 배열안에 배열들을 받을 수 있다
  const mp4Blob = new Blob([mp4file.buffer], { type: "video/mp4" });

  // 브라우저에서 해당 파일 url을 만들어준다
  const mp4Url = URL.createObjectURL(mp4Blob);

  const a = document.createElement("a");
  a.herf = mp4Url;
  a.download = "나의녹화파일.mp4";
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
