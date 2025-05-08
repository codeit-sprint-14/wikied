# 📖 Wikied
> 위키드, 남들이 만드는 나만의 위키

> 배포 URL:
> <br>개발 기간: 2025. 04. 22 ~ 2025. 05. 12

<br>

<img width="1193" alt="image" src="https://github.com/user-attachments/assets/dbe58a05-ef86-42d8-9377-28aac66b9f19" />

<br/>

<p align="center">
<img src="https://img.shields.io/badge/NEXT.JS-000000?style=for-the-badge&logo=next.js&logoColor=white" 
/> <img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/STYLED_COMPONENTS-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
<img src="https://img.shields.io/badge/REACT_QUILL_NEW-A42967?style=for-the-badge&logo=react-quill-new&logoColor=white" />
<img src="https://img.shields.io/badge/LOTTIE-1ABC9C?style=for-the-badge&logo=lottie&logoColor=white" />
</br>
<img src="https://img.shields.io/badge/MATTER.JS-4B5562?style=for-the-badge&logo=matter.js&logoColor=white" />
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white" />
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white" />
<img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" />
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white" />
</p>
</br>

## 💭 Wikied 소개 
- Wikied는 사람들의 이야기를 기록하고 공유할 수 있는 커뮤니티 플랫폼입니다. 
- 사용자는 로그인 후 자신만의 위키 페이지를 자유롭게 작성하고 수정할 수 있으며, 다른 유저의 위키나 게시글을 검색하고 열람할 수 있습니다. 
- 또한, 댓글과 좋아요 기능을 통해 사용자 간 소통이 가능하며, 직관적인 인터페이스와 반응형 UI로 누구나 어디서든 편리하게 사용할 수 있도록 만들어졌습니다.

## <br>👩🏻‍💻팀원 소개 

<table>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/82707286?v=4" width="100"></td>
    <td><img src="https://avatars.githubusercontent.com/u/134246428?v=4" width="100"></td>
    <td><img src="https://avatars.githubusercontent.com/u/193219745?v=4" width="100"></td>
    <td><img src="https://avatars.githubusercontent.com/u/192935871?v=4" width="100"></td>
    <td><img src="https://avatars.githubusercontent.com/u/87702194?v=4" width="100"></td>
  </tr>
  <tr>
    <th><a href="https://github.com/kim-1997">김성빈</a></th>
    <th><a href="https://github.com/KingsMinn">김승민</a></th>
    <th><a href="https://github.com/BANGHoYeong">방호영</a></th>
    <th><a href="https://github.com/zeon0xx0">조지현</a></th>
    <th><a href="https://www.naver.com">최혜윤</a></th>
  </tr>
</table>
</br>

## 📂 폴더 구조
```bash
my-next-project/
├── components/          # 재사용 가능한 UI 컴포넌트 모음
│   ├── common/          # 여러 곳에서 쓰이는 진짜 공통 컴포넌트 (예: Button, Input)
│   └── feature/         # 특정 기능(feature) 관련 컴포넌트 (예: PostCard, UserProfile)
├── hooks/               # 커스텀 React Hooks
├── lib/                 # 프로젝트 전반에서 사용되는 유틸리티 함수, 클라이언트 등 (예: api.ts)
├── node_modules/        # 설치된 패키지들 (신경 안 써도 됨)
├── pages/               # 페이지 라우터 핵심 폴더
│   ├── api/             # API 라우트 핸들러들
│   │   └── auth/
│   │       └── [...nextauth].ts
│   │   └── ... (다른 API들)
│   ├── _app.tsx         # 모든 페이지 감싸는 공통 레이아웃/설정 파일
│   ├── _document.tsx    # Styled Components SSR 설정 위한 파일
│   ├── _error.tsx       # (선택) 공통 에러 페이지
│   ├── index.tsx        # 홈페이지 (루트 경로 '/')
│   └── ... (다른 페이지들)
├── public/              # 정적 파일 (이미지, 폰트 등)
│   └── favicon.ico
├── styles/              # 전역 스타일 및 스타일 관련 파일 모음
│   ├── globals.css      # 전역 CSS (기본 스타일 초기화 등)
│   ├── theme.ts         # 스타일드 컴포넌트 테마 정의 파일
│   └── ... (다른 공통 스타일 관련 파일)
├── types/               # TypeScript 타입 정의 파일 모음
│   └── styled.d.ts      # 스타일드 컴포넌트 테마 타입 확장용
├── utils/               # 서버/클라이언트 공용 유틸리티 (예: date 포맷팅)
├── .env.local           # 환경 변수 (Git 무시!)
├── .eslintrc.json       # ESLint 설정
├── .gitignore           # Git 무시 목록
├── next.config.js       # Next.js 설정
├── package.json         # 프로젝트 정보 및 의존성
├── tsconfig.json        # TypeScript 설정
└── README.md            # 프로젝트 설명
```
## <br>🐳 작업 흐름

1. 이슈 생성
2. `develop` 최신화
3. `develop`에서 새 `feature` 브랜치 생성
4. 해당 브랜치에서 작업 진행
5. 기능별 커밋 나눠서 작성
6. 작업 완료 후 에러 체크 & push
7. PR 작성하고 코드 리뷰 요청
8. 리뷰 완료 후 develop에 머지

## <br>💡 시작 가이드

```shell
### 1. 클론하기
git clone https://github.com/codeit-sprint-14/wikied.git

### 2. 디렉토리 이동
cd wikied

### 3. 패키지 설치
npm install

### 4. 프로젝트 실행
npm run dev

```
## <br>✨ 주요 기능

### 🔐 회원가입 및 로그인 기능
- 이메일 및 소셜 간편 로그인 지원
- 인증된 사용자만 위키 및 게시물 작성 가능

### 🧏🏻‍♂️ 위키 기능
- 위키 생성, 수정, 삭제
  - 인증된 사용자가 자신만의 위키를 자유롭게 작성하고 관리할 수 있습니다
- 다른 유저의 위키 검색 및 열람
  - 키워드 기반 검색으로 다양한 위키를 검색하고 열람할 수 있습니다

### 📑 게시물 기능
-  게시물 작성, 수정, 삭제  
    - 여러 개의 자유로운 주제 게시글을 작성할 수 있습니다
-  댓글 및 좋아요 기능  
    - 게시물에 댓글을 달고 좋아요를 눌러 유저 간 상호작용이 가능합니다
-  일반 게시물 및 베스트 게시물 열람  
    - 다른 유저의 게시물을 열람할 수 있으며 좋아요 수를 기준으로 인기 게시물을 강조해서 보여줍니다
 
### 🔥 404 페이지
- 친화적인 404 페이지 제공
    - 오류 메세지뿐만 아니라 인기 게시물 추천도 함께 노출됩니다 

### 🔔 알림 기능
- 댓글 작성, 위키 수정 등 주요 이벤트 발생시 실시간 알림 표시
- 사용자의 활동 내역 빠르게 확인 가능

### ✒️ 텍스트 에디터
- 다양한 서식(굵기, 이미지 첨부, 글씨 정렬 등)을 적용한 위키, 게시물 작성 가능









