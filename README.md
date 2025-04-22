# 📖 Wikied

> 위키드, 남들이 만드는 나만의 위키

</br></br></br>

## 💪 Developers

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
</br></br></br>



## 🛠️ 기술 스택 (Tech Stack)

| 역할 | 사용 기술 |
|--|--|
| Language | ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white) ![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) |
| Build Tool | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) |
| Router | ![ReactRouter](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) |
| Styling | ![StyledComponents](https://img.shields.io/badge/Styled_Components-DB7093?style=flat-square&logo=styled-components&logoColor=white) |
| API | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square) |

</br></br></br>

## 📂 폴더 구조 (Folder Structure)

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

</br></br></br>

## 📂 폴더/파일명 네이밍 컨벤션

| 대상 | 규칙 | 예시 |
|--|--|--|
| 폴더명 | 케밥케이스 (kebab-case) | components, user-profile |
| 컴포넌트 파일명 | 파스칼케이스 (PascalCase) | UserProfile.jsx |
| 스타일 파일명 | 케밥케이스 + .styles.js | user-profile.styles.js |
| 이미지/아이콘 파일명 | 케밥케이스 | logo-icon.png, profile-default.png |
| 함수명/변수명 | 카멜케이스 (camelCase) | fetchUserData, userList |
| 환경변수 | 대문자+스네이크케이스 | REACT_APP_API_URL |

</br></br></br>

## 🌿 브랜치 네이밍 컨벤션

| 브랜치 종류 | 네이밍 규칙 | 예시 |
|--|--|--|
| 기능 개발 | feature/{작업-설명} | feature/login-ui |
| 버그 수정 | fix/{버그-설명} | fix/login-button-bug |
| 핫픽스 | hotfix/{긴급수정-설명} | hotfix/main-build-error |
| 문서 수정 | docs/{문서-설명} | docs/readme-update |

</br></br></br>

## 💻 Commit Convention

### 🔗 기본 구조
```
[타입] 제목

본문

꼬리말
```

### 📑 Commit Type
| 태그 | 의미 |
|--|--|
| Feat | ✨ 새로운 기능 추가 |
| Fix | 🐛 버그 수정 |
| Docs | 📚 문서 수정 |
| Style | 💄 포맷팅, 세미콜론 누락 등 |
| Refactor | 🔨 리팩토링 |
| Test | ✅ 테스트 코드 추가 |
| Chore | 🔧 설정, 빌드 변경 등 |


</br></br></br>


### ✍️ 제목 규칙
- 간결하게, 50자 이하
- 마침표/특수기호 금지


</br></br></br>


### 📝 본문 규칙
- 72자 이하 줄바꿈
- 변경 이유, 목적을 자세히 기록

</br></br></br>


### 📎 꼬리말 규칙
- 이슈번호 연결: `Resolves: #이슈번호`
- 참고 이슈는 `Ref: #이슈번호`

</br></br></br>

### 📖 Commit 예시
```
✨ Feat: 회원가입 화면 및 로직 추가

- 회원가입 화면 UI 구현
- 사용자 입력 검증 로직 추가
- API 통신 연결

Resolves: #12
Related to: #8
```
</br></br></br>

### 🌈 이모지 가이드
| 이모지 | 의미 |
|--|--|
| 🎨 | 코드 형식/구조 개선 |
| 📰 | 새 파일 추가 |
| ✨ | 새로운 기능 |
| 📝 | 사소한 변경 |
| 💄 | UI / 스타일 수정 |
| 🐎 | 성능 개선 |
| 📚 | 문서 수정 |
| 🐛 | 버그 수정 |
| 🚑 | 핫픽스 |
| 🔥 | 코드 삭제 |
| 🚜 | 구조 변경 |
| 🔨 | 리팩토링 |
| 💎 | 새 릴리즈 |
| 🔖 | 버전 태그 |
| 🚀 | 배포 |

</br></br></br>

## 🍳 PR Convention (Pull Request 규칙)

| 항목 | 설명 |
|--|--|
| Summary | 간단 변경 요약 |
| Changes | 주요 변경 요약 |
| Checklist | ✔️ 컨벤션 준수 ✔️ 테스트 ✔️ 설명 ✔️ 브랜치 확인 |
| Test Plan | 테스트 방법 및 결과 |
| Screenshots | UI 변경 시 캡처 필수 |
| Additional | 리뷰어 참고 사항 |

</br></br></br>

## 📲 Issue Convention

| 항목 | 설명 |
|--|--|
| Summary | 작업 요약 |
| Branch Name | `feature/{작업설명}`, `fix/{버그설명}` |
| Due Date | YYYY/MM/DD |
| References | 관련 자료 링크 |
| Checklist | 할 일 리스트 |

</br></br></br>

## 🖊️ Git Flow

| 브랜치명 | 설명 |
|--|--|
| main | 배포 브랜치 |
| develop | 통합 개발 브랜치 |
| feature/* | 기능 개발 브랜치 |

### 💡 작업 흐름
1. 이슈 생성
2. `develop` 최신화
3. `develop`에서 새 `feature` 브랜치 생성
4. 해당 브랜치에서 작업 진행
5. 기능별 커밋 나눠서 작성
6. 작업 완료 후 에러 체크 & push
7. PR 작성하고 코드 리뷰 요청
8. 리뷰 완료 후 develop에 머지

</br></br></br>

## 🔗 배포 주소
</br></br>


## 🚀 배포 환경
- Vercel
</br></br>

## 📅 프로젝트 기간
2025년 4월 22일 ~ 2025년 5월 12일
