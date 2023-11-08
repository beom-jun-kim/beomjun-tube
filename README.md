# 🖥️ 프로젝트소개
유튜브를 참고하여 만든 미디어 공유 사이트입니다
<br>
<br>
<img src="https://github.com/beom-jun-kim/beomjun-tube/assets/84590988/53d18ca4-ed10-49c6-aa6d-ddb016c82fa1">
<br>
<br>

# 🕰️ 개발기간
* 23.01.02일 - 23.03.01일
* <a href="https://github.com/users/beom-jun-kim/projects/3">개발계획- github projects tab</a>
<br>

# ✏️ 개발환경
- **Programming** : JavaScript
- **Framework** :  express 
- **Database** : mongodb
- **Library** : bcrypt , multer , scss
- **Service** : aws s3
- **Deploy** : heroku
<br>

# ⚙️ 주요기능

### 로그인 기능
- 회원가입 (ID 중복 검증)
- SNS로그인 (쿠키 및 세션 생성)

### 마이페이지
- 내가 업로드한 영상
- 프로필 이미지
- 프로필 편집

### 미디어 업로그 기능(영상 / 이미지)
- 조회수
- 태그 , 제목 , 설명 (+편집기능)
- 플레이바 커스터마이징

### 검색기능
 
### 댓글기능
<br>

# 🚩 라우팅

### global router
- / : Home
- /join : Join
- /login : Login
- /search : Search

### user router
- /users/:id : See User
- /users/logout : Log Out
- /users/edit : Edit My Profile
- /users/delete : Delete My Profile

### video router
- /videos/:id : see Video
- /videos/:id/edit : Edit Video
- /videos/:id/delete : Delete Video
- /videos/upload : Upload Video
- /videos/comments : Comment on a video
- /videos/comments/delete : Delete A Comment of a Video
