# kymin9118.github.io

김영민(YOUNGMIN.KIM)의 포트폴리오 사이트입니다. React 19와 Vite로 만들고 GitHub Pages로 배포합니다.

주소: https://kymin9118.github.io/

## 구성

- 첫 화면: 대표 프로젝트 슬라이드 (자동 넘김, 이름 탭, ‹ › 버튼, 끌기, 키보드 ← →)
- About: 소개, 기본정보, 학력, 프로젝트, 주력 기술, 자격증, 일하는 방식
- Skills: 분야별 기술. 누르면 쓴 곳을 보여 주고 아래 프로젝트를 걸러 냅니다
- Projects: 대표 프로젝트는 상세 페이지, 이전 프로젝트는 GitHub로 연결
- 상세 페이지: 개요 → 문제와 해결 → 설계 → 담당 파트 → 주요 기능 → 기술적 기여 → 트러블슈팅 → 성과·회고
- 다크 모드가 기본이고, 오른쪽 위 버튼으로 밝은 모드로 바꿀 수 있습니다

## 로컬에서 보기 (선택)

Node.js 22가 필요합니다. 배포만 할 때는 필요 없습니다.

```powershell
npm install; npm run dev
```

## 배포

`main` 브랜치에 푸시하면 `.github/workflows/deploy.yml`이 빌드해서 GitHub Pages에 올립니다.
처음 한 번은 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 변경
