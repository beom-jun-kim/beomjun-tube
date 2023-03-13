import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "rec.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.herf = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.innerText = "변환중...";
  actionBtn.disabled = true;

  // https://github.com/ffmpegwasm/ffmpeg.wasm
  // log:true : 콘솔에서 현재 진행상황 확인
  const ffmpeg = createFFmpeg({ log: true });

  // 소프트웨어가 무거울 수 있기에 기다려줘야함
  await ffmpeg.load();

  // writeFile : ffmpeg 가상의 어떤 곳에 파일 생성
  // rec.webm : 파일명. 맘대로 해도 됨
  // binaryData : videoFile
  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));

  // ffmpeg.run : 가상 컴퓨터에 이미 존재하는 파일을 input(-i)으로 받는다
  // -r 60 : 초당 60프레임으로 인코딩
  await ffmpeg.run("-i", files.input, "-r", "60", files.output);

  // -ss: 특정시간대로 이동
  // -frames:v : 첫프레임의 스크린샷
  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumb
  );

  // readFile : 데이터 읽기
  const mp4file = ffmpeg.FS("readFile", files.output);
  const thumbFile = ffmpeg.FS("readFile", files.thumb);

  // Uint8Array(양의 정수 8비트 배열) , buffer 배열 반환 (데이터)
  // 이 배열로부터 blob을 만들어내야한다
  // blob : 파일류의 불변하는 미가공 데이터
  // rqw data(미가공 데이터) 즉, binary data에 접근하려면 mp4file.buffer 사용
  // buffer는 arrayBuffer 반환 , arrayBuffer는 raw binary data를 나타내는 obj
  // new Blob()는 배열안에 배열들을 받을 수 있다
  const mp4Blob = new Blob([mp4file.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  // createObjectURL() : 브라우저에서 해당 파일 url을 만들어준다
  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, "나의녹화파일.mp4");
  downloadFile(thumbUrl, "썸네일.jpg");

  // 파일삭제
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumb);

  // url 삭제
  // revokeObjectURL() : 객체 URL을 더는 쓸 일이 없을 때 사용.
  ffmpeg.FS("unlink", files.input);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(videoFile);

  actionBtn.disabled = false;
  actionBtn.innerText = "녹화하기";
  actionBtn.addEventListener("click", handleStart);
};

const handleStop = () => {
  actionBtn.innerText = "녹화하기";
  actionBtn.removeEventListener("click", handleStop);
  actionBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  actionBtn.innerText = "녹화중지";
  actionBtn.removeEventListener("click", handleStart);

  actionBtn.addEventListener("click", handleStop);

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
    video: { width: 1024, height: 576 },
  });
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);